#pragma once

#include "Globals.hpp"
#include "Macros.hpp"
#include "Networking.hpp"

#include <iostream>
#include <fstream>
#include <cstdlib>
#include <nlohmann/json.hpp>

typedef std::string str;
using json = nlohmann::json;

namespace userSettings {
	void userSettings();
}
