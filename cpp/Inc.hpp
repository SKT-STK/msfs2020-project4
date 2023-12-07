#pragma once

#include "Globals.hpp"
#include "CppServer.hpp"
#include "Macros.hpp"

#include <iostream>
#include <memory>
#include <nlohmann/json.hpp>

typedef std::string str;
using json = nlohmann::json;

namespace inc {
	void inc();
	Server** _getPtr();
}
