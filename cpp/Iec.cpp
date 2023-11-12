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

str handleUdp(const str& data) {
	auto msg = json::parse(data);
	if (msg["path"].get<str>() != "/reverses") return "";
	msg = msg["msg"];

	bool setNew = msg["set"].get<unsigned short>() != 0;
	if (setNew) global::reverses = !global::reverses;

	json jres;
	jres["msg"]["path"] = "/reverses";
	jres["msg"]["msg"] = (int)global::reverses;
	return jres.dump();
}

namespace iec {
	Servers main(int ports[2]) {
		auto tSock = new Server(true, ports[0]);
		tSock->setCallback(handleTcp);
		
		auto uSock = new Server(false, ports[1]);
		uSock->setCallback(handleUdp);

		tSock->start();
		uSock->start();

		return { tSock, uSock };
	}
}
