#include "Main.hpp"

int main(int argc, char* argv[]) {
	int ports[2] = { 55411, 2642 }; // Replace With argv[argc] in Production!
	Server* sockets[2] = { nullptr };
	iec::iec(ports, &sockets);

	Server* socket = inc::inc(31231);

	flightSim::flightSim();

	for (const auto& i : sockets) delete i;
	delete socket;
	return 0;
}
