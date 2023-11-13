#pragma once

#include "Globals.hpp"
#include "CppServer.hpp"
#include "Macros.hpp"
#include "Iec.hpp"
#include "Inc.hpp"

#include <iostream>
#include <thread>
#include <nlohmann/json.hpp>

#define debug(x) std::cout << x << std::endl;

typedef std::string str;
using json = nlohmann::json;
