#include "Iec.hpp"

str handleTcp(const str& data) {
	json msg = json::parse(data);
	str path = msg["path"].get<str>();
	float val = msg["val"].get<float>();

	if (path == "/yoke") global::yoke = static_cast<unsigned short>(val) != 0;
	else if (path == "/thrust") global::thrust = static_cast<unsigned short>(val) != 0;
	else if (path != "/maxN1") global::maxN1 = val - 1.f;

	return "";
}

namespace handleUdp {
	json reverses(json data) {
		bool setNew = data["set"].get<unsigned short>() != 0;
		if (setNew) global::reverses = !global::reverses;

		json jres;
		jres["msg"]["path"] = "/reverses";
		jres["msg"]["msg"] = (int)global::reverses;
		return jres;
	}

	json planeModel() {
		json j;
		j["msg"]["path"] = "/plane-model";
		j["msg"]["msg"]["x"] = std::to_string(global::phoneRot.pitch);
		j["msg"]["msg"]["z"] = std::to_string(global::phoneRot.roll);
		return j;
	}

	str main(const str& data) {
		auto msg = json::parse(data);
		str path = msg["path"].get<str>();
		if (path == "/reverses") return reverses(msg["msg"]).dump();
		if (path == "/plane-model") return planeModel().dump();
		else return "";
	}
}

namespace iec {
	Servers main(int ports[2]) {
		auto tSock = new Server(true, ports[0]);
		tSock->setCallback(handleTcp);
		
		auto uSock = new Server(false, ports[1]);
		uSock->setCallback(handleUdp::main);

		tSock->start();
		uSock->start();

		return { tSock, uSock };
	}
}
