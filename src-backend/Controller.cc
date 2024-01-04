#include "Controller.h"

XINPUT_STATE state;

bool isAButtonPressed(DWORD dwUserIndex) {
  if (XInputGetState(dwUserIndex, &state) == ERROR_SUCCESS) {
    if (state.Gamepad.wButtons & XINPUT_GAMEPAD_A)
      return true;
  }

  return false;
}

int getRY_() {
  XInputGetState(global::userSettings.index, &state);

  float ry = state.Gamepad.sThumbRY / 100.f;
  return static_cast<int>(ry *= 100.f);
}

short getIndex_() {
  for (DWORD i = 0; i < XUSER_MAX_COUNT; ++i) {
    if (isAButtonPressed(i))
      return i;
  }

  return -1;
}

static void init() {
  ZeroMemory(&state, sizeof(XINPUT_STATE));
}

namespace controller {
  void controller() {
    init();
  }

  int getRY() {
    return getRY_();
  }

  short getIndex() {
    return getIndex_();
  }
}
