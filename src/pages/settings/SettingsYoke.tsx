import SettingsEntryNumberInputWrapper from "@/components/app/settings/SettingsEntryNumberInputWrapper"
import SettingsEntryTextFieldWrapper from "@/components/app/settings/SettingsEntryTextFieldWrapper"
import CalibrateButton from "@/components/app/settings/yoke/CalibrateButton"
import { useSettingsStore } from "@/data/useSettingsStore"

const SettingsYoke = () => {
  const {
    settings: {
      yoke_Roll,
      yoke_Pitch,
      yoke_Easing
    },
    yoke_SetRoll,
    yoke_SetPitch,
    yoke_SetEasing
  } = useSettingsStore()

  return (<>
    <SettingsEntryNumberInputWrapper
      text='Maximum Roll Deflection'
      hoverText='Yoke&apos;s left-right movement in degrees mapped to a 0-100% deflection in the simulation.'
      useStoreProps={{ prop: yoke_Roll, setProp: yoke_SetRoll }}
      minMax={[10, 90]}
    />
    <CalibrateButton />
    <SettingsEntryNumberInputWrapper
      text='Maximum Pitch Deflection'
      hoverText='Yoke&apos;s up-down movement in degrees mapped to a 0-100% deflection in the simulation.'
      useStoreProps={{ prop: yoke_Pitch, setProp: yoke_SetPitch }}
      minMax={[5, 50]}
    />
    <SettingsEntryTextFieldWrapper
      text='Easing Function'
      hoverText='Normalized easing function for the aileron and elevator controls. It allows you to make the 0-100%
        mapping non-linear. Math functions like exp(), abs() and sin() are allowed. If you&apos;d
        like to reference &pi;, use &apos;PI&apos;, the same goes for Euler&apos;s number, use &apos;E&apos;. It
        is possible to just Ctrl+C Ctrl+V from Desmos Visualizer. In a case of invalid equation, linear function will be used.'
      useStoreProps={{ prop: yoke_Easing, setProp: yoke_SetEasing }}
    />
  </>)
}
export default SettingsYoke
