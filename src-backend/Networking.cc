#include "Networking.h"

typedef std::string str;
using json = nlohmann::json;

namespace inc {
  Server* sock = nullptr;

  str handleUdp(const str& data) {
    json msg;
    try {
      msg = json::parse(data);
    }
    catch (json::exception) {
      return "";
    }
    if (msg["path"].get<str>() != "/accel-data") return "";
    msg = msg["msg"];

    auto x = (float)msg["accelData"][0].get<double>();
    auto y = (float)msg["accelData"][1].get<double>();
    auto z = (float)msg["accelData"][2].get<double>();

    float roll = std::atan2(y, z) * 57.3f;
    float pitch = std::atan2(x, std::sqrt(y*y + z*z)) * 57.3f;

    std::lock_guard<std::mutex> lock(global::mtx);  

    global::phoneRot.roll = static_cast<int>(roll * 10.f) / 10.f;
    global::phoneRot.pitch = static_cast<int>(pitch * 10.f) / 10.f;

    return "";
}

  Server** getPtr() {
    return &sock;
  }

  void refresh() {
    if (sock != nullptr)
      delete sock;
    sock = new Server(UDP, global::userSettings.port, false, false);
    sock->SetCallback(handleUdp);
    sock->Start();
  }
}

namespace iec {
  str handleTcp(const str& data) {
    json msg;
    try {
      msg = json::parse(data);
    }
    catch (json::exception) {
      return "";
    }
    str path = msg["path"].get<str>();
    float val = msg["val"].get<float>();

    std::lock_guard<std::mutex> lock(global::mtx);
    if (path == "/yoke") global::yoke = static_cast<int>(val) != 0;
    else if (path == "/thrust") global::thrust = static_cast<int>(val) != 0;
    else if (path == "/max-n1") global::maxN1 = val - 1.f;
    else if (path == "/user-settings") userSettings::userSettings();

    return "";
  }

  namespace handleUdp {
    json reverses(json data) {
      bool setNew = data["set"].get<int>() != 0;
      if (setNew) {
        std::lock_guard<std::mutex> lock(global::mtx);
        global::reverses = !global::reverses;
      }

      json j;
      j["msg"]["path"] = "/reverses";
      j["msg"]["msg"] = static_cast<int>(global::reverses);
      return j;
    }

    json planeModel() {
      json j;
      j["msg"]["path"] = "/plane-model";
      j["msg"]["msg"]["x"] = std::to_string(global::phoneRot.pitch);
      j["msg"]["msg"]["z"] = std::to_string(global::phoneRot.roll);
      return j;
    }

    json msfsStatus() {
      json j;
      j["msg"]["path"] = "/msfs-status";
      j["msg"]["msg"] = static_cast<int>(global::simOpen);
      return j;
    }

    str main(const str& data) {
      json msg;
      try {
        msg = json::parse(data);
      }
      catch (json::exception) {
        return "";
      }
      str path = msg["path"].get<str>();
      if (path == "/reverses") return reverses(msg["msg"]).dump();
      if (path == "/plane-model") return planeModel().dump();
      if (path == "/msfs-status") return msfsStatus().dump();
      else return "";
    }
  }

  std::array<std::unique_ptr<Server>, 2> main(int ports[2]) {
    std::array<std::unique_ptr<Server>, 2> ret;

    ret[0] = std::make_unique<Server>(TCP, ports[0], false, false);
    ret[0]->SetCallback(handleTcp);

    ret[1] = std::make_unique<Server>(UDP, ports[1], false, false);
    ret[1]->SetCallback(handleUdp::main);

    ret[0]->Start();
    ret[1]->Start();

    return ret;
  }
}

static ret_Servers init(int ports[2]) {
  ret_Servers ret;

  ret.servers = iec::main(ports);
  ret.server = inc::getPtr();

  return ret;
}


namespace networking {
  ret_Servers networking(int ports[2]) {
    return init(ports);
  }

  void refreshInc_() {
    inc::refresh();
  }
}
