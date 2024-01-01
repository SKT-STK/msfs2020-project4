#include "Main.h"

int main(int argc, char* argv[]) {
	// Replace With argv[1, 2, 3] in Production!
	int ports[2] = { 55411, 2642 };
	global::userSettings.settingsPath = "D:\\c++-projects\\MSFS2020\\Project4\\other\\resources\\conf\\settings.json";

	userSettings::userSettings();

	ret_Servers sockets = networking::networking(ports);

	flightSim::flightSim();

	delete *sockets.server;
	return 0;
}
