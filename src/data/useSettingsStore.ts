import { create } from "zustand"

interface settings {
  phone_Port: number | null
  yoke_Roll: number | null
  yoke_Pitch: number | null
}

export interface SettingsState {
  settings: settings

  phone_SetPort: (port: number | null) => void
  yoke_SetRoll: (port: number | null) => void
  yoke_SetPitch: (port: number | null) => void

  setSettings: (settings: settings) => void
}

export const useSettingsStore = create<SettingsState>()(set => ({
  settings: {
    phone_Port: null,
    yoke_Roll: null,
    yoke_Pitch: null,
  },

  phone_SetPort: (val: number | null) => set(state => ({ settings: { ...state.settings, phone_Port: val } })),
  yoke_SetRoll: (val: number | null) => set(state => ({ settings: { ...state.settings, yoke_Roll: val } })),
  yoke_SetPitch: (val: number | null) => set(state => ({ settings: { ...state.settings, yoke_Pitch: val } })),

  setSettings: (settings: settings) => set({ settings }),
}))
