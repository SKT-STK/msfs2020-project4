import SettingsEntryNumberInputWrapper from "@/components/app/settings/SettingsEntryNumberInputWrapper"
import SettingsEntryTextFieldWrapper from "@/components/app/settings/SettingsEntryTextFieldWrapper"
import { useSettingsStore } from "@/data/useSettingsStore"

const SettingsYoke = () => {
  const {
    settings: {
      yoke_Roll, yoke_Pitch
    },
    yoke_SetRoll, yoke_SetPitch
  } = useSettingsStore()

  return (<>
    <SettingsEntryNumberInputWrapper
      text='Maximum Roll Deflection'
      hoverText='Yoke&apos;s left-right movement in degrees mapped to a 0-100% deflection in the simulation.'
      useStoreProps={{ prop: yoke_Roll, setProp: yoke_SetRoll }}
      minMax={[10, 90]}
    />
    <SettingsEntryNumberInputWrapper
      text='Maximum Pitch Deflection'
      hoverText='Yoke&apos;s up-down movement in degrees mapped to a 0-100% deflection in the simulation.'
      useStoreProps={{ prop: yoke_Pitch, setProp: yoke_SetPitch }}
      minMax={[5, 50]}
    />
    <SettingsEntryTextFieldWrapper
      text='Easing Function'
    />
  </>)
}
export default SettingsYoke
