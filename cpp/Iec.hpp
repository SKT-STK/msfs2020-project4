#pragma once

#include "Globals.hpp"
#include "CppServer.hpp"
#include "Macros.hpp"

#include <iostream>
#include <fstream>
#include <nlohmann/json.hpp>

typedef std::string str;
using json = nlohmann::json;

namespace iec {
	void iec(int [2], Server*(*)[2], const char*);
}
