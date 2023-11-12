#pragma once

#include "Globals.hpp"
#include "CppServer.hpp"

#include <iostream>
#include <nlohmann/json.hpp>

typedef std::string str;
using json = nlohmann::json;

typedef struct Servers {
	Server* tcp;
	Server* udp;
} Servers;

namespace iec {
	Servers main(int[2]);
}
