#include "Main.hpp"

str tcpcallback(const str& data) {
	auto msg = json::parse(data);
	str path = msg["path"].get<str>();
	bool val = msg["val"].get<unsigned short>() != 0;

	if (path == "/yoke") global::yoke = val;
	else if (path == "/thrust") global::thrust = val;

	return "";
}

str udpcallback(const str& data) {
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

int main() {
	auto tsock = new Server(true, 55411);
	tsock->setCallback(tcpcallback);
	tsock->start();

	auto usock = new Server(false, 2642);
	usock->setCallback(udpcallback);
	usock->start();

	while (!GetAsyncKeyState(VK_NUMPAD0)) {
		sleepfor(10);
		debug(global::yoke << ' ' << global::thrust << ' ' << global::reverses);
	}

	delete tsock;
	delete usock;
	return 0;
}
