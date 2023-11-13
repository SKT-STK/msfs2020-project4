#include "Main.hpp"

int main(int argc, char* argv[]) {
	int ports[2] = { 55411, 2642 }; // Replace With argv[argc] in Production!
	Servers sockets = iec::main(ports);
	Server* socket = inc::main(31231);

	while (!GetAsyncKeyState(VK_NUMPAD0)) {
		sleepfor(10);
		//debug(global::yoke << ' ' << global::thrust << ' ' << global::reverses << ' ' << global::maxN1);
		debug(global::phoneRot.roll << ' ' << global::phoneRot.pitch);
	}

	delete sockets.tcp;
	delete sockets.udp;
	delete socket;
	return 0;
}
