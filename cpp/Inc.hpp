#pragma once

#include "Globals.hpp"
#include "CppServer.hpp"

#include <iostream>
#include <nlohmann/json.hpp>

typedef std::string str;
using json = nlohmann::json;

namespace inc {
	Server* main(int);
}
