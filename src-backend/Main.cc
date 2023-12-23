#include "Main.h"

void _Debug() {
while (true) {
	if (GetAsyncKeyState(VK_NUMPAD0)) break;
	sleepfor(10);


	//float i = to_normal(global::phoneRot.roll, global::userSettings.roll);

	//int index = (int)(std::abs(i) * 1000.f + 0.5f);
	//float value = global::userSettings.easingsYoke[index];
	/////*return*/debug((i < 0.f ? -value : value));

	debug(global::userSettings.deactivate);
}
}

int main(int argc, char* argv[]) {
	// Replace With argv[1, 2, 3] in Production!
	int ports[2] = { 55411, 2642 };
	global::userSettings.settingsPath = "D:\\c++-projects\\MSFS2020\\Project4\\other\\resources\\conf\\settings.json";

	userSettings::userSettings();

	ret_Servers sockets = networking::networking(ports);

	flightSim::flightSim();
	// _Debug();

	delete *sockets.server;
	return 0;
}
