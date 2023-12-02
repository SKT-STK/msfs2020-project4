import { create } from "zustand"

export interface SettingsLayoutState {
  startOutAnim: boolean
  setStartOutAnim: (startOutAnim: boolean) => void
  showPopup: boolean
  setShowPopup: (showPopup: boolean) => void
}

export const useSettingsLayoutStore = create<SettingsLayoutState>()(set => ({
  startOutAnim: false,
  setStartOutAnim: (startOutAnim: boolean) => set({ startOutAnim }),
  showPopup: false,
  setShowPopup: (showPopup: boolean) => set({ showPopup })
}))
