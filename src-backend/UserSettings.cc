#include "UserSettings.h"

typedef std::string str;
using json = nlohmann::json;

easings_t proccessString(const str& name) {
	str path = "";
	path += global::userSettings.settingsPath;
	path += "\\..\\hashed" + name + "Easings.json";
	std::ifstream file(path, std::ios::binary);

	size_t size = sizeof(char) * 1024 * 8;
	char* buff = (char*)std::malloc(size);
	memset(buff, 0, size);

	file.read(buff, size / sizeof(char));
	json j = json::parse(buff);

	std::free(buff);
	file.close();
	return j.get<easings_t>();
}

static void init() {
	std::ifstream file(global::userSettings.settingsPath, std::ios::binary);

	size_t size = sizeof(char) * 1024;
	char* buff = (char*)std::malloc(size);
	memset(buff, 0, size);
	file.read(buff, size / sizeof(char));

	try {
		json j = json::parse(buff);
		
    int newPort = j["phone_Port"].get<int>();
    if (global::userSettings.port != newPort) {
		  global::userSettings.port = newPort;
		  networking::refreshInc();
    }

		global::userSettings.roll = (float)j["yoke_Roll"].get<int>();
		global::userSettings.pitch = (float)j["yoke_Pitch"].get<int>();
		global::userSettings.easingsYoke = proccessString("Yoke");

		global::userSettings.idle = j["throttles_Idle"].get<int>();
		global::userSettings.toga = j["throttles_ToGa"].get<int>();
    global::userSettings.index = (short)j["throttles_Index"].get<int>();
		global::userSettings.easingsThrottles = proccessString("Throttles");

		global::userSettings.deactivate = j["reverses_Deactivate"].get<int>();
	}
	catch (json::exception) {}
	
	std::free(buff);
	file.close();
}

namespace userSettings {
	void userSettings() {
		init();
	}
}
