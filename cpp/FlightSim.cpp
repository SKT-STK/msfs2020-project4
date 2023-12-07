#include "FlightSim.hpp"

bool IsProcessRunning(const TCHAR* processName) {
	HANDLE hSnapShot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
	if (hSnapShot == INVALID_HANDLE_VALUE)
		return false;

	PROCESSENTRY32 pe32;
	pe32.dwSize = sizeof(PROCESSENTRY32);

	if (!Process32First(hSnapShot, &pe32)) {
		CloseHandle(hSnapShot);
		return false;
	}

	do {
		if (_tcsicmp(pe32.szExeFile, processName) == 0) {
			CloseHandle(hSnapShot);
			return true;
		}
	}
	while (Process32Next(hSnapShot, &pe32));

	CloseHandle(hSnapShot);
	return false;
}

static void init() {
	while (true) {
		sleepfor(10);

		std::lock_guard<std::mutex> lock(global::mtx);
		global::simOpen = IsProcessRunning("notepad.exe");
	}
}

namespace flightSim {
	void flightSim() {
		init();
	}
}
