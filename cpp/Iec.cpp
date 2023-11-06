#include "Iec.hpp"

namespace iec {
	void main(int port) {
		UDP sock;
		sock.init("127.0.0.1", port);

		sock.recvData("/yoke", [](const str&, int, json msg) -> json {
			json j;
			j["path"] = "/yoke";
			if (msg["set"].get<int>() != 0) global::yoke = !global::yoke;
			j["msg"] = (int)global::yoke;
			return j;
		});

		sock.recvData("/thrust", [](const str&, int, json msg) -> json {
			json j;
			j["path"] = "/thrust";
			if (msg["set"].get<int>() != 0) global::thrust = !global::thrust;
			j["msg"] = (int)global::thrust;
			return j;
		});

		sock.recvData("/reverses", [](const str&, int, json msg) -> json {
			json j;
			j["path"] = "/reverses";
			if (msg["set"].get<int>() != 0) global::reverses = !global::reverses;
			j["msg"] = (int)global::reverses;
			return j;
		});

		sock.start(true);
	}
}
