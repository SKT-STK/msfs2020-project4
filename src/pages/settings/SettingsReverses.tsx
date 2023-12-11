import SettingsEntryNumberInputWrapper from "@/components/app/settings/SettingsEntryNumberInputWrapper"
import { useSettingsStore } from "@/data/useSettingsStore"

const SettingsReverses = () => {
  const {
    settings: {
      reverses_Deactivate,
    },
    reverses_SetDeactivate,
  } = useSettingsStore()

  return (
    <SettingsEntryNumberInputWrapper 
      text='Reverses Deactivation Speed'
      minMax={[20, 80]}
      useStoreProps={{ prop: reverses_Deactivate, setProp: reverses_SetDeactivate }}
    />
  )
}
export default SettingsReverses
