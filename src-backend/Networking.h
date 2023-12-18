#pragma once

#include "Globals.h"
#include "CppServer.h"
#include "Macros.h"
#include "UserSettings.h"

#include <iostream>
#include <memory>
#include <nlohmann/json.hpp>
#include <array>

typedef struct {
  std::array<std::unique_ptr<Server>, 2> servers;
  Server** server;
} ret_Servers;

namespace networking {
  ret_Servers networking(int[2]);
  void refreshInc_();
}
