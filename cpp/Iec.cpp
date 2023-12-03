#include "Iec.hpp"

namespace handleUserSettings {
	const char* settingsPath = nullptr;

	void main() {
		std::fstream file(settingsPath, std::ios::in);
		char buff[1024] = { 0 };
		file.read(buff, sizeof buff);
		file.close();
		json j = json::parse(buff);

		global::userSettings.port = j["phone_Port"].get<int>();
		global::userSettings.roll = j["yoke_Roll"].get<int>();
		global::userSettings.pitch = j["yoke_Pitch"].get<int>();

		debug(global::userSettings.port << ' ' << global::userSettings.roll << ' ' << global::userSettings.pitch);
	}
}

str handleTcp(const str& data) {
	json msg;
	try {
		msg = json::parse(data);
	}
	catch (json::exception) {
		return "";
	}
	str path = msg["path"].get<str>();
	float val = msg["val"].get<float>();

	std::lock_guard<std::mutex> lock(global::mtx);
	if (path == "/yoke") global::yoke = static_cast<int>(val) != 0;
	else if (path == "/thrust") global::thrust = static_cast<int>(val) != 0;
	else if (path == "/max-n1") global::maxN1 = val - 1.f;
	else if (path == "/user-settings") handleUserSettings::main();

	return "";
}

namespace handleUdp {
	json reverses(json data) {
		bool setNew = data["set"].get<int>() != 0;
		if (setNew) {
			std::lock_guard<std::mutex> lock(global::mtx);
			global::reverses = !global::reverses;
		}

		json j;
		j["msg"]["path"] = "/reverses";
		j["msg"]["msg"] = static_cast<int>(global::reverses);
		return j;
	}

	json planeModel() {
		json j;
		j["msg"]["path"] = "/plane-model";
		j["msg"]["msg"]["x"] = std::to_string(global::phoneRot.pitch / -2.5);
		j["msg"]["msg"]["z"] = std::to_string(global::phoneRot.roll);
		return j;
	}

	json msfsStatus() {
		json j;
		j["msg"]["path"] = "/msfs-status";
		j["msg"]["msg"] = static_cast<int>(global::simOpen);
		return j;
	}

	str main(const str& data) {
		json msg;
		try {
			msg = json::parse(data);
		}
		catch (json::exception) {
			return "";
		}
		str path = msg["path"].get<str>();
		if (path == "/reverses") return reverses(msg["msg"]).dump();
		if (path == "/plane-model") return planeModel().dump();
		if (path == "/msfs-status") return msfsStatus().dump();
		else return "";
	}
}

void init(int ports[2], Server* (*ret)[2], const char* settingsPath) {
	handleUserSettings::settingsPath = settingsPath;

	auto tSock = new Server(true, ports[0]);
	tSock->SetCallback(handleTcp);

	auto uSock = new Server(false, ports[1]);
	uSock->SetCallback(handleUdp::main);

	tSock->Start();
	uSock->Start();

	(*ret)[0] = tSock;
	(*ret)[1] = uSock;
}

namespace iec {
	void iec(int ports[2], Server* (*ret)[2], const char* settingsPath) {
		init(ports, ret, settingsPath);
	}
}
