#pragma once

#include <array>
#include <mutex>

typedef std::array<float, 1001> easings_t;

typedef enum {
	ABSOLUTE_CONTROL,
	AUTO_THROTTLE,
	HYBRID_MODE,
} ThrottlesModes;

typedef struct {
	const char* settingsPath;

	int port;

	float roll;
	float pitch;
	easings_t easingsYoke;

	int idle;
	int toga;
	easings_t easingsThrottles;
	ThrottlesModes throttlesMode;

	int deactivate;
} UserSettings;

typedef struct {
	float roll;
	float pitch;
} RollPitch;

namespace global {
	inline std::mutex mtx;

	inline bool simOpen = /*false*/true;
	inline bool yoke = false;
	inline bool thrust = false;
	inline bool reverses = false;
	inline float maxN1 = 0.f;
	inline RollPitch phoneRot = { 0.f, 0.f };
	inline UserSettings userSettings = {
		nullptr,
		0,
		0.f, 0.f, {},
		0, 0, {}, ThrottlesModes::ABSOLUTE_CONTROL,
		0,
	};
}
