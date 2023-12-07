#include "Inc.hpp"

Server* sock = nullptr;

str handleUdp(const str& data) {
	json msg;
	try {
		msg = json::parse(data);
	}
	catch (json::exception) {
		return "";
	}
	if (msg["path"].get<str>() != "/accel-data") return "";
	msg = msg["msg"];

	auto x = (float)msg["accelData"][0].get<double>();
	auto y = (float)msg["accelData"][1].get<double>();
	auto z = (float)msg["accelData"][2].get<double>();

	float roll = std::atan2(y, z) * 57.3f;
	float pitch = std::atan2(x, std::sqrt(y*y + z*z)) * 57.3f;

	std::lock_guard<std::mutex> lock(global::mtx);
	global::phoneRot = { roll, pitch };

	return "";
}

static void init() {
	if (sock != nullptr) delete sock;
	sock = new Server(false, global::userSettings.port, false, false);
	sock->SetCallback(handleUdp);
	sock->Start();
}

Server** getPtr() {
	init();
	return &sock;
}

namespace inc {
	void inc() {
		init();
	}
	Server** get_ptr() {
		return getPtr();
	}
}
