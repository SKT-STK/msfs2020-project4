#include "FlightSim.h"

#define NEGATIVE_CONTROLLER_RANGE 32768

typedef enum {
	D_THROTTLES_1,
	D_THROTTLES_2,
	D_CONTROL_SURFACES_ROLL,
	D_CONTROL_SURFACES_PITCH,
	D_CONTROL_SURFACES_RUDDER,
	D_ON_GROUND,
	D_GROUND_SPEED,
} DATA_DEFS;

typedef enum {
	R_ON_GROUND,
	R_GROUND_SPEED,
} DATA_REQS;

HANDLE hSimConnect = INVALID_HANDLE_VALUE;
HRESULT hr = E_FAIL;

namespace requestedData {
  bool onGround = true;
  int groundSpeed = 0;
}

void initDataDefs() {
	SimConnect_AddToDataDefinition(hSimConnect, D_THROTTLES_1, "GENERAL ENG THROTTLE LEVER POSITION:1", "percent", SIMCONNECT_DATATYPE_FLOAT32);
	SimConnect_AddToDataDefinition(hSimConnect, D_THROTTLES_2, "GENERAL ENG THROTTLE LEVER POSITION:2", "percent", SIMCONNECT_DATATYPE_FLOAT32);
	SimConnect_AddToDataDefinition(hSimConnect, D_CONTROL_SURFACES_PITCH, "ELEVATOR POSITION", "percent", SIMCONNECT_DATATYPE_FLOAT32);
	SimConnect_AddToDataDefinition(hSimConnect, D_CONTROL_SURFACES_ROLL, "AILERON POSITION", "percent", SIMCONNECT_DATATYPE_FLOAT32);
	SimConnect_AddToDataDefinition(hSimConnect, D_CONTROL_SURFACES_RUDDER, "RUDDER POSITION", "percent", SIMCONNECT_DATATYPE_FLOAT32);
	SimConnect_AddToDataDefinition(hSimConnect, D_ON_GROUND, "SIM ON GROUND", "bool", SIMCONNECT_DATATYPE_INT32);
	SimConnect_AddToDataDefinition(hSimConnect, D_GROUND_SPEED, "GROUND VELOCITY", "knots", SIMCONNECT_DATATYPE_INT32);
}

void initDataReqs() {
	SimConnect_RequestDataOnSimObject(hSimConnect, R_ON_GROUND, D_ON_GROUND, SIMCONNECT_OBJECT_ID_USER, SIMCONNECT_PERIOD_VISUAL_FRAME);
	SimConnect_RequestDataOnSimObject(hSimConnect, R_GROUND_SPEED, D_GROUND_SPEED, SIMCONNECT_OBJECT_ID_USER, SIMCONNECT_PERIOD_VISUAL_FRAME);
}

void CALLBACK dispatchProcHandler(SIMCONNECT_RECV* pData, DWORD, void*) {
	SIMCONNECT_RECV_SIMOBJECT_DATA* pObjdata = nullptr;

	switch (pData->dwID) {
		case SIMCONNECT_RECV_ID_SIMOBJECT_DATA: {
			pObjdata = reinterpret_cast<SIMCONNECT_RECV_SIMOBJECT_DATA*>(pData);
			switch (pObjdata->dwRequestID) {
				case R_ON_GROUND:
				  memcpy(&requestedData::onGround, &pObjdata->dwData, sizeof(bool));
					break;
				case R_GROUND_SPEED:
				  memcpy(&requestedData::groundSpeed, &pObjdata->dwData, sizeof(int));
				  break;
				default:
					break;
			}
			break;
		}
		default:
			break;
	}
}

void setControlSurfaces() {
  if (!global::yoke)
    return;

  float roll = to_normal(global::phoneRot.roll, global::userSettings.roll);
  roll = roll < 0.f 
    ? -global::userSettings.easingsYoke.at(-static_cast<int>(roll * 1'000.f))
    : global::userSettings.easingsYoke.at(static_cast<int>(roll * 1'000.f));

  float pitch = to_normal(global::phoneRot.pitch, global::userSettings.pitch);
  pitch = pitch < 0.f
    ? -global::userSettings.easingsYoke.at(-static_cast<int>(pitch * 1'000.f))
    : global::userSettings.easingsYoke.at(static_cast<int>(pitch * 1'000.f));

  float rudder = requestedData::onGround ? roll : 0.f;
  roll = requestedData::onGround ? 0.f : roll;

  SimConnect_SetDataOnSimObject(hSimConnect, D_CONTROL_SURFACES_PITCH, SIMCONNECT_OBJECT_ID_USER, 0, 1, sizeof(float), &pitch);
  SimConnect_SetDataOnSimObject(hSimConnect, D_CONTROL_SURFACES_ROLL, SIMCONNECT_OBJECT_ID_USER, 0, 1, sizeof(float), &roll);
  SimConnect_SetDataOnSimObject(hSimConnect, D_CONTROL_SURFACES_RUDDER, SIMCONNECT_OBJECT_ID_USER, 0, 1, sizeof(float), &rudder);
}

void setThrustLevers() {
  if (!global::thrust)
    return;

  float ry = controller::getRY();

  ry = to_normal((ry - (float)global::userSettings.toga), global::userSettings.toga - global::userSettings.idle - 100) + 1;

  if (ry < 0.f)
    ry = 0.f;
  else if (ry > 1.f)
    ry = 1.f;

  ry = static_cast<int>(ry * 1'000.f);
  ry = global::userSettings.easingsThrottles.at((int)ry);

  if (ry < 0.f)
    ry = 0.f;
  else if (ry > 100.f)
    ry = 100.f;

  std::lock_guard<std::mutex> lock(global::mtx);

  if (requestedData::onGround && global::reverses) {
    if (requestedData::groundSpeed > global::userSettings.deactivate) {
      if (ry == 0.f)
        ry = 1.f;
      ry = -ry;
    }
    else {
      global::reverses = false;
    }
  }

  global::curN1 = static_cast<int>(ry);

  SimConnect_SetDataOnSimObject(hSimConnect, D_THROTTLES_1, SIMCONNECT_OBJECT_ID_USER, 0, 1, sizeof(float), &ry);
  SimConnect_SetDataOnSimObject(hSimConnect, D_THROTTLES_2, SIMCONNECT_OBJECT_ID_USER, 0, 1, sizeof(float), &ry);
}

static void init() {
	while (hr != S_OK) {
		hr = SimConnect_Open(&hSimConnect, "mydiycontrolsv4", nullptr, 0, nullptr, 0);
		sleepfor(1'000);
	}

	initDataDefs();
	initDataReqs();

	while (true) {
		sleepfor(10);

		hr = SimConnect_CallDispatch(hSimConnect, dispatchProcHandler, nullptr);

		setControlSurfaces();
		setThrustLevers();

    if (hr == S_OK)
      global::simOpen = true;
    else {
      global::simOpen = false;
      SimConnect_Close(hSimConnect);
      while (hr != S_OK) {
        hr = SimConnect_Open(&hSimConnect, "mydiycontrolsv4", nullptr, 0, nullptr, 0);
        sleepfor(1'000);
      }
    }
	}

  if (global::simOpen)
    SimConnect_Close(hSimConnect);
}

namespace flightSim {
	void flightSim() {
		init();
	}
}
