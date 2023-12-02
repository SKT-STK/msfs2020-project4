import { create } from "zustand"

interface SettingsState {
  phone: {
    port?: number,
    setPort?: (port: number) => void
  }
}

export const useSettingsStore = create<SettingsState>()(set => ({
  phone: {
    port: 0,
    setPort: (newPort: number) => set({ phone: { port: newPort } })
  }
}))
