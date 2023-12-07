#pragma once

#include "Globals.hpp"
#include "Macros.hpp"
#include "Inc.hpp"

#include <iostream>
#include <fstream>
#include <memory>
#include <nlohmann/json.hpp>

typedef std::string str;
using json = nlohmann::json;

namespace userSettings {
	void userSettings();
}
