#include "FlightSim.h"

static void init() {
	HANDLE hSimConnect = INVALID_HANDLE_VALUE;

	while (true) {
		sleepfor(10);
		HRESULT hr = SimConnect_Open(&hSimConnect, "mydiycontrols", NULL, 0, 0, 0);


		// debug(global::yoke);
	}
}

namespace flightSim {
	void flightSim() {
		init();
	}
}
