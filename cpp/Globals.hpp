#pragma once

#include <mutex>

typedef struct {
	int port;
	int roll;
	int pitch;
} UserSettings;

typedef struct {
	double roll;
	double pitch;
} RollPitch;

namespace global {
	inline std::mutex mtx;

	inline bool simOpen = false;
	inline bool yoke = false;
	inline bool thrust = false;
	inline bool reverses = false;
	inline float maxN1 = 0.f;
	inline RollPitch phoneRot = { 0.0, 0.0 };
	inline UserSettings userSettings = { 0, 0, 0 };
}
