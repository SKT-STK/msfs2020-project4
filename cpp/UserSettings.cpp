#include "UserSettings.hpp"

typedef std::string str;
using json = nlohmann::json;

ThrottlesModes proccessModes(const str& i) {
	if (i == "absolutecontrol")
		return ThrottlesModes::ABSOLUTE_CONTROL;

	else if (i == "autothrottle")
		return ThrottlesModes::AUTO_THROTTLE;

	else if (i == "hybridmode")
		return ThrottlesModes::HYBRID_MODE;

	return ThrottlesModes::ABSOLUTE_CONTROL;
}

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

	json j = json::parse(buff);

	try {
		global::userSettings.port = j["phone_Port"].get<int>();

		global::userSettings.roll = (float)j["yoke_Roll"].get<int>();
		global::userSettings.pitch = (float)j["yoke_Pitch"].get<int>();
		global::userSettings.easingsYoke = proccessString("Yoke");

		global::userSettings.idle = j["throttles_Idle"].get<int>();
		global::userSettings.toga = j["throttles_ToGa"].get<int>();
		global::userSettings.easingsThrottles = proccessString("Throttles");
		global::userSettings.throttlesMode = proccessModes(j["throttles_Mode"].get<str>());

		global::userSettings.deactivate = j["reverses_Deactivate"].get<int>();

		networking::refreshInc_();
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
