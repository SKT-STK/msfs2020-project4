#pragma once

#include "Globals.hpp"
#include "CppServer.hpp"
#include "Macros.hpp"
#include "UserSettings.hpp"

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
