import { create } from "zustand"

interface settings {
  phone_Port: number | null

  yoke_Roll: number | null
  yoke_Pitch: number | null
  yoke_Easing: string | null

  throttles_Idle: number | null
  throttles_ToGa: number | null
  throttles_Index: number | null
  throttles_Easing: string | null

  reverses_Deactivate: number | null
}

export interface SettingsState {
  settings: settings

  phone_SetPort: (val: number | null) => void

  yoke_SetRoll: (val: number | null) => void
  yoke_SetPitch: (val: number | null) => void
  yoke_SetEasing: (val: string | null) => void

  throttles_SetIdle: (val: number | null) => void
  throttles_SetToGa: (val: number | null) => void
  throttles_SetIndex: (val: number | null) => void
  throttles_SetEasing: (val: string | null) => void

  reverses_SetDeactivate: (val: number | null) => void

  setSettings: (settings: settings) => void
}

export const useSettingsStore = create<SettingsState>()(set => ({
  settings: {
    phone_Port: null,

    yoke_Roll: null,
    yoke_Pitch: null,
    yoke_Easing: null,

    throttles_Idle: null,
    throttles_ToGa: null,
    throttles_Index: null,
    throttles_Easing: null,

    reverses_Deactivate: null,
  },

  phone_SetPort: (val: number | null) => set(state => ({ settings: { ...state.settings, phone_Port: val } })),

  yoke_SetRoll: (val: number | null) => set(state => ({ settings: { ...state.settings, yoke_Roll: val } })),
  yoke_SetPitch: (val: number | null) => set(state => ({ settings: { ...state.settings, yoke_Pitch: val } })),
  yoke_SetEasing: (val: string | null) => set(state => ({ settings: { ...state.settings, yoke_Easing: val } })),

  throttles_SetIdle: (val: number | null) => set(state => ({ settings: { ...state.settings, throttles_Idle: val } })),
  throttles_SetToGa: (val: number | null) => set(state => ({ settings: { ...state.settings, throttles_ToGa: val } })),
  throttles_SetIndex: (val: number | null) => set(state => ({ settings: { ...state.settings, throttles_Index: val } })),
  throttles_SetEasing: (val: string | null) => set(state => ({ settings: { ...state.settings, throttles_Easing: val } })),

  reverses_SetDeactivate: (val: number | null) => set(state => ({ settings: {...state.settings, reverses_Deactivate: val } })),

  setSettings: (settings: settings) => set({ settings }),
}))
