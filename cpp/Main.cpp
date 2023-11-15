#include "Main.hpp"

int main(int argc, char* argv[]) {
	int ports[2] = { 55411, 2642 }; // Replace With argv[argc] in Production!
	Server* sockets[2] = { nullptr };
	iec::main(ports, &sockets);

	Server* socket = inc::main(31231);

	while (!GetAsyncKeyState(VK_NUMPAD0)) {
		sleepfor(10);
		debug(global::maxN1);
	}

	for (const auto& i : sockets) delete i;
	delete socket;
	return 0;
}
