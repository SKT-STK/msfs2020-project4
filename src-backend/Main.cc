#include "Main.h"

using std::string, std::array;
using json = nlohmann::json;

int main(int argc, char* argv[]) {
  // int ports[] = { 55411, 55411 + 10 };

  // string path;
  // DWORD pid;
  // bool w8 = true;
  // auto s = new Server(TCP, ports[0]);
  // s->SetCallback([&w8, &pid, &path](const string& data) -> string {
  //   json msg;
  //   try {
  //     msg = json::parse(data);
  //   }
  //   catch (json::exception) {
  //     return "";
  //   }
  //   auto _path = msg["path"].get<string>();
  //   auto val = msg["val"].get<array<string, 2>>();

  //   std::lock_guard<std::mutex> lock(global::mtx);
  //   if (_path == "START-CORE") {
  //     path = val[0];
  //     pid = std::stoul(val[1]);
  //   }

  //   w8 = false;
  //   return "";
  // });
  // s->Start();

  // while (w8)
  //   sleepfor(100);
  // delete s;

  // global::userSettings.settingsPath = path.c_str();

  // std::thread([pid]() -> void {
  //   HANDLE hProcess = OpenProcess(SYNCHRONIZE, FALSE, pid);
  //   WaitForSingleObject(hProcess, INFINITE);
  //   CloseHandle(hProcess);
  // }).detach();

  int ports[] = { std::stoi(argv[1]), std::stoi(argv[2]) };
  global::userSettings.settingsPath = argv[3];

	userSettings::userSettings();
  controller::controller();

  /*
    Intentional memory leak due to the fact that it'd have to be
      deleted at the end of the program either way.
    The memory in question is inc::Server* from Networking.cc.
  */
	Servers_t _sockets = networking::networking(ports);

	flightSim::flightSim();

	return 0;
}
