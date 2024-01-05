#include "Main.h"

using std::string;

int main(int argc, char* argv[]) {
  int ports[2];

	if (argc < 4) {
    ports[0] = 55411;
    ports[1] = 55411 + 10;
	  global::userSettings.settingsPath = "D:\\c++-projects\\MSFS2020\\Project4\\other\\resources\\conf\\settings.json";
  }
  else {
    ports[0] = std::stoi(string(argv[1]));
    ports[1] = std::stoi(string(argv[2]));
    global::userSettings.settingsPath = [argc, argv]() -> const char* {
      string path = "";
      for (int i = 3; i < argc; ++i) {
        path += string(argv[i]);
      }
      return path.c_str();
    }();
  }

	userSettings::userSettings();
  controller::controller();

	ret_Servers sockets = networking::networking(ports);

	flightSim::flightSim();

	delete *sockets.server;
	return 0;
}
