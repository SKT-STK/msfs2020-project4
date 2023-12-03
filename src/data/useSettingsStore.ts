import { create } from "zustand"

interface settings {
  phone_Port: number | null
}

export interface SettingsState {
  settings: settings
  phone_SetPort: (port: number | null) => void

  setSettings: (settings: settings) => void
}

export const useSettingsStore = create<SettingsState>()(set => ({
  settings: {
    phone_Port: null
  },
  phone_SetPort: (port: number | null) => set({ settings: { phone_Port: port } }),

  setSettings: (settings: settings) => set({ settings })
}))
