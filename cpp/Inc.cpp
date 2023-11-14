#include "Inc.hpp"

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

	auto x = msg["accelData"][0].get<double>();
	auto y = msg["accelData"][1].get<double>();
	auto z = msg["accelData"][2].get<double>();

	double roll = std::atan2(y, z) * 57.3;
	double pitch = std::atan2(x, std::sqrt(y * y + z * z)) * 57.3;

	std::lock_guard<std::mutex> lock(global::mtx);
	global::phoneRot = { roll, pitch };

	return "";
}

namespace inc {
	Server* main(int port) {
		auto sock = new Server(false, port);
		sock->setCallback(handleUdp);
		sock->start();

		return sock;
	}
}
