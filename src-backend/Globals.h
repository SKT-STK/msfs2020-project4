#pragma once

#include <array>
#include <mutex>

typedef std::array<float, 1001> easings_t;

typedef struct {
	const char* settingsPath;

	int port;

	float roll;
	float pitch;
	easings_t easingsYoke;

	int idle;
	int toga;
  short index;
	easings_t easingsThrottles;

	int deactivate;
} UserSettings;

typedef struct {
	float roll;
	float pitch;
} RollPitch;

namespace global {
	inline std::mutex mtx;

	inline bool simOpen = false/* true */;
	inline bool yoke = false;
	inline bool thrust = false;
	inline bool reverses = false;
	inline RollPitch phoneRot = { 0.f, 0.f };
  inline int throttlesPos = 0;
  inline int curN1 = 0;
	inline UserSettings userSettings = {
		nullptr,
		0,
		0.f, 0.f, { 0.f },
		0, 0, -1, { 0.f },
		0,
	};
}

template<typename T, typename U>
static constexpr inline T to_normal(T inpt, U range) noexcept {
#define T_ static_cast<T>
#define U_ static_cast<U>
	if (range <= U_(0)) return T_(0);

	T ret = T_((((inpt + T_(range)) * T_(2)) / (range * U_(2))) - T_(1));

	if (ret < T_(-1)) ret = T_(-1);
	if (ret > T_(1)) ret = T_(1);

	return ret;
}
