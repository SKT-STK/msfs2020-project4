#pragma once

#include "Globals.h"
#include "CppServer.h"
#include "Macros.h"
#include "UserSettings.h"
#include "Controller.h"

#include <iostream>
#include <memory>
#include <nlohmann/json.hpp>
#include <array>

typedef std::array<std::unique_ptr<Server>, 2> Servers_t;

namespace networking {
  Servers_t networking(int[2]);
  void refreshInc();
}
