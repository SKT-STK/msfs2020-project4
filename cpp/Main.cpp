#include "Main.hpp"
//
template<typename T, typename U>
static constexpr inline const T to_normal(T inpt, U range) {
#define T_ static_cast<T>
#define U_ static_cast<U>
	if (range <= U_(0)) return T_(0);

	T ret = T_((((inpt + T_(range)) * T_(2)) / (range * U_(2))) - T_(1));

	if (ret < T_(-1)) ret = T_(-1);
	if (ret > T_(1)) ret = T_(1);

	return ret;
}

void _Debug() {
while (true) {
	if (GetAsyncKeyState(VK_NUMPAD0)) break;
	sleepfor(10);


	float i = to_normal(global::phoneRot.roll, global::userSettings.roll);
	
	int index = (int)(std::abs(i) * 1000.f + 0.5f);
	float value = global::userSettings.easingsYoke.at(index);
	///*return*/debug((i < 0.f ? -value : value));
}
}
//

int main(int argc, char* argv[]) {
	// Replace With argv[1, 2, 3] in Production!
	int ports[2] = { 55411, 2642 };
	global::userSettings.settingsPath = "C:\\Users\\kwasn\\Desktop\\github\\msfs2020-project4\\other\\resources\\settings.json";

	userSettings::userSettings();

	auto _ = iec::iec(ports);

	Server** socket = inc::get_ptr();

	//flightSim::flightSim();
	_Debug();

	delete *socket;
	return 0;
}
