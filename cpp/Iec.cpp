#include "Iec.hpp"

str handleTcp(const str& data) {
	json msg = json::parse(data);
	str path = msg["path"].get<str>();
	float val = msg["val"].get<float>();

	std::lock_guard<std::mutex> lock(global::mtx);
	if (path == "/yoke") global::yoke = static_cast<int>(val) != 0;
	else if (path == "/thrust") global::thrust = static_cast<int>(val) != 0;
	else if (path != "/max-n1") global::maxN1 = val - 1.f;

	return "";
}

namespace handleUdp {
	json reverses(json data) {
		bool setNew = data["set"].get<int>() != 0;
		if (setNew) {
			std::lock_guard<std::mutex> lock(global::mtx);
			global::reverses = !global::reverses;
		}

		json jres;
		jres["msg"]["path"] = "/reverses";
		jres["msg"]["msg"] = (int)global::reverses;
		return jres;
	}

	json planeModel() {
		json j;
		j["msg"]["path"] = "/plane-model";
		j["msg"]["msg"]["x"] = std::to_string(global::phoneRot.pitch / -2.0);
		j["msg"]["msg"]["z"] = std::to_string(global::phoneRot.roll);
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
		else return "";
	}
}

namespace iec {
	void main(int ports[2], Server* (*ret)[2]) {
		auto tSock = new Server(true, ports[0]);
		tSock->setCallback(handleTcp);
		
		auto uSock = new Server(false, ports[1]);
		uSock->setCallback(handleUdp::main);

		tSock->start();
		uSock->start();

		(*ret)[0] = tSock;
		(*ret)[1] = uSock;
	}
}
