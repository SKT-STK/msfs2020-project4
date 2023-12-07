#include "UserSettings.hpp"

easings_t proccessString() {
	typedef unsigned long long size_t;

	str path = "";
	path += global::userSettings.settingsPath;
	path += "\\..\\hashedEasings.json";
	std::fstream file(path, std::ios::in);
	size_t size = (size_t)(8 * 1024);
	auto buff = new char[size];
	memset(buff, '\0', size);
	file.read(buff, size);

	json j = json::parse(buff);

	file.close();
	delete[] buff;
	return j.get<easings_t>();
}

static void init() {
	std::fstream file(global::userSettings.settingsPath, std::ios::in);
	char buff[1024] = { 0 };
	file.read(buff, sizeof buff);
	file.close();
	json j = json::parse(buff);

	try {
		global::userSettings.port = j["phone_Port"].get<int>();
		global::userSettings.roll = (float)j["yoke_Roll"].get<int>();
		global::userSettings.pitch = (float)j["yoke_Pitch"].get<int>();
		global::userSettings.easings = proccessString();
		inc::inc();
	}
	catch (json::exception) { return; }
}

namespace userSettings {
	void userSettings() {
		init();
	}
}
