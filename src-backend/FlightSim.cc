#include "FlightSim.h"

#define NEGATIVE_CONTROLLER_RANGE 32768

typedef enum {
	D_THROTTLES_1,
	D_THROTTLES_2,
	D_CONTROL_SURFACES,
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
	hr &= SimConnect_AddToDataDefinition(hSimConnect, D_THROTTLES_1, "GENERAL ENG THROTTLE LEVER POSITION:1", "percent", SIMCONNECT_DATATYPE_INT32);
	hr &= SimConnect_AddToDataDefinition(hSimConnect, D_THROTTLES_2, "GENERAL ENG THROTTLE LEVER POSITION:2", "percent", SIMCONNECT_DATATYPE_INT32);
	hr &= SimConnect_AddToDataDefinition(hSimConnect, D_CONTROL_SURFACES, "ELEVATOR POSITION", "percent", SIMCONNECT_DATATYPE_FLOAT32);
	hr &= SimConnect_AddToDataDefinition(hSimConnect, D_CONTROL_SURFACES, "AILERON POSITION", "percent", SIMCONNECT_DATATYPE_FLOAT32);
	hr &= SimConnect_AddToDataDefinition(hSimConnect, D_CONTROL_SURFACES, "RUDDER POSITION", "degrees", SIMCONNECT_DATATYPE_FLOAT32);
	hr &= SimConnect_AddToDataDefinition(hSimConnect, D_ON_GROUND, "SIM ON GROUND", "bool", SIMCONNECT_DATATYPE_INT32);
	hr &= SimConnect_AddToDataDefinition(hSimConnect, D_GROUND_SPEED, "GROUND VELOCITY", "knots", SIMCONNECT_DATATYPE_INT32);
}

void initDataReqs() {
	hr &= SimConnect_RequestDataOnSimObject(hSimConnect, R_ON_GROUND, D_ON_GROUND, SIMCONNECT_OBJECT_ID_USER, SIMCONNECT_PERIOD_VISUAL_FRAME);
	hr &= SimConnect_RequestDataOnSimObject(hSimConnect, R_GROUND_SPEED, D_GROUND_SPEED, SIMCONNECT_OBJECT_ID_USER, SIMCONNECT_PERIOD_VISUAL_FRAME);
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

void initSimConnect() {
	while (hr != S_OK) {
		hr = SimConnect_Open(&hSimConnect, "mydiycontrolsv4", NULL, 0, 0, 0);
		sleepfor(1'000);
	}
	global::simOpen = true;
	std::thread([](HANDLE& hSimConnect, HRESULT& hr) -> void {
		while (true) {
			if (hr == S_OK) {
				global::simOpen = true;
				continue;
			}
			global::simOpen = false;
			while (hr != S_OK) {
				SimConnect_Close(&hSimConnect);
        hr = SimConnect_Open(&hSimConnect, "mydiycontrolsv4", NULL, 0, 0, 0);
				sleepfor(1'000);
			}
			sleepfor(100);
		}
	}, std::ref(hSimConnect), std::ref(hr)).detach();
}

void setControlSurfaces() {
  float roll = to_normal(global::phoneRot.roll, global::userSettings.roll);
  roll = roll < 0.f 
    ? -global::userSettings.easingsYoke.at(-static_cast<int>(roll * 1'000.f))
    : global::userSettings.easingsYoke.at(static_cast<int>(roll * 1'000.f));

  float pitch = to_normal(global::phoneRot.pitch, global::userSettings.pitch);
  pitch = pitch < 0.f
    ? -global::userSettings.easingsYoke.at(-static_cast<int>(pitch * 1'000.f))
    : global::userSettings.easingsYoke.at(static_cast<int>(pitch * 1'000.f));
}

void setThrustLevers() {
  XINPUT_STATE state;
  ZeroMemory(&state, sizeof(XINPUT_STATE));

  XInputGetState(global::controllerIndex, &state);

  float ry = state.Gamepad.sThumbRY / 100.f;
  ry *= 100.f;

  ry = to_normal((ry - (float)global::userSettings.toga), global::userSettings.toga - global::userSettings.idle - 100) + 1;

  if (ry < 0.f)
    ry = 0.f;
  else if (ry > 1.f)
    ry = 1.f;

  ry = static_cast<int>(ry * 1'000.f);
  ry = global::userSettings.easingsThrottles.at((int)ry);

  hr &= SimConnect_SetDataOnSimObject(hSimConnect, D_THROTTLES_1, SIMCONNECT_OBJECT_ID_USER, NULL, 1, sizeof(float), &ry);
  hr &= SimConnect_SetDataOnSimObject(hSimConnect, D_THROTTLES_2, SIMCONNECT_OBJECT_ID_USER, NULL, 1, sizeof(float), &ry);
}

static void init() {
	// initSimConnect();

	// initDataDefs();
	// initDataReqs();

	while (true) {
		sleepfor(10);

		// hr &= SimConnect_CallDispatch(hSimConnect, dispatchProcHandler, nullptr);

		setControlSurfaces();
		setThrustLevers();
	}
}

namespace flightSim {
	void flightSim() {
		init();
	}
}
