import { create } from "zustand"

export interface SettingsState {
  settings: {
    phone_Port: number | null
  }
  phone_SetPort: (port: number | null) => void
}

export const useSettingsStore = create<SettingsState>()(set => ({
  settings: {
    phone_Port: 0
  },
  phone_SetPort: (port: number | null) => set({ settings: { phone_Port: port } })
}))
