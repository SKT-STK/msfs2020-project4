#pragma once

#include <mutex>

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
	inline float maxN1 = 100.0;
	inline RollPitch phoneRot = { 0.0, 0.0 };
}
