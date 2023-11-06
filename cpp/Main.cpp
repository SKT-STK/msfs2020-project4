#include "Main.hpp"

int main(int argc, char* argv[]) {
	if (argc != 2) return -1;
	//debug(argv);

	std::thread(iec::main, std::stoi(argv[1])).detach();

	while (true) {
		sleepfor(1'000);

		//debug(global::yoke << ' ' << global::thrust << ' ' << global::reverses);
	}
	return 0;
}
