#include "UserSettings.hpp"

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
	std::fstream file(path, std::ios::in | std::ios::binary);

	unsigned long long size = sizeof(char) * 8ULL * 1024ULL;
	auto buff = static_cast<char*>(std::malloc(size));
	if (buff != nullptr)
		memset(buff, 0, size);

	file.read(buff, size);

	json j = json::parse(buff);

	file.close();
	std::free(buff);
	return j.get<easings_t>();
}

static void init() {
	std::fstream file(global::userSettings.settingsPath, std::ios::in | std::ios::binary);
	char buff[1024] = { 0 };
	file.read(buff, sizeof buff);
	file.close();
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
	catch (json::exception) { return; }
}

namespace userSettings {
	void userSettings() {
		init();
	}
}
