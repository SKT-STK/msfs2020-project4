#pragma once

#include "Globals.hpp"
#include "CppServer.hpp"

#include <iostream>
#include <nlohmann/json.hpp>

typedef std::string str;
using json = nlohmann::json;

namespace iec {
	void main(int [2], Server*(*)[2]);
}
