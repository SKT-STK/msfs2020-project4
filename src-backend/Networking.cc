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

  void refresh_() {
    if (sock != nullptr)
      delete sock;
    sock = new Server(UDP, global::userSettings.port);
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

    json controllerRY() {
      int val = controller::getRY();

      json j;
      j["msg"]["path"] = "/controller-ry";
      j["msg"]["msg"] = val;
      return j;
    }

    json controllerA() {
      int idx = controller::getIndex();

      json j;
      j["msg"]["path"] = "/controller-a";
      j["msg"]["msg"] = idx;
      return j;
    }

    json controllerN1() {
      json j;
      j["msg"]["path"] = "/controller-n1";
      j["msg"]["msg"] = global::curN1;
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
      else if (path == "/plane-model") return planeModel().dump();
      else if (path == "/msfs-status") return msfsStatus().dump();
      else if (path == "/controller-ry") return controllerRY().dump();
      else if (path == "/controller-a") return controllerA().dump();
      else if (path == "/controller-n1") return controllerN1().dump();
      return "";
    }
  }

  std::array<std::unique_ptr<Server>, 2> main(int ports[2]) {
    std::array<std::unique_ptr<Server>, 2> ret;

    ret[0] = std::make_unique<Server>(TCP, ports[0]);
    ret[0]->SetCallback(handleTcp);

    ret[1] = std::make_unique<Server>(UDP, ports[1]);
    ret[1]->SetCallback(handleUdp::main);

    ret[0]->Start();
    ret[1]->Start();

    return ret;
  }
}

static Servers_t init(int ports[2]) {
  return iec::main(ports);
}


namespace networking {
  Servers_t networking(int ports[2]) {
    return init(ports);
  }

  void refreshInc() {
    inc::refresh_();
  }
}
