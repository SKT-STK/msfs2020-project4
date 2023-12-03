#include "Main.hpp"

int main(int argc, char* argv[]) {
	int ports[2] = { 55411, 2642 }; // Replace With argv[1, 2] in Production!
	const char* settingsPath = "C:\\Users\\kwasn\\Desktop\\github\\msfs2020-project4\\public\\settings.json"; // Replace With argv[3] in Production!
	Server* sockets[2] = { nullptr };
	iec::iec(ports, &sockets, settingsPath);

	Server* socket = inc::inc(31231);

	flightSim::flightSim();

	for (const auto& i : sockets) delete i;
	delete socket;
	return 0;
}
