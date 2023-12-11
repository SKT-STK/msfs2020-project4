#pragma once

#include "Globals.hpp"
#include "CppServer.hpp"
#include "Macros.hpp"
#include "Main.hpp"
#include "UserSettings.hpp"

#include <iostream>
#include <fstream>
#include <memory>
#include <nlohmann/json.hpp>

typedef std::string str;
using json = nlohmann::json;

namespace iec {
	std::array<std::unique_ptr<Server>, 2> iec(int [2]);
}
