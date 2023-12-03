import SettingsEntryNumberInputWrapper from "@/components/app/settings/SettingsEntryNumberInputWrapper"
import { useSettingsStore } from "@/data/useSettingsStore"

const SettingsPhone = () => {
  const {
    settings: {
      phone_Port
    },
    phone_SetPort
  } = useSettingsStore()

  return (
    <SettingsEntryNumberInputWrapper
      text='Wireless Port'
      hoverText='Networking port used to receive data from smartphone&apos;s app.'
      useStoreProps={{ prop: phone_Port, setProp: phone_SetPort }}
      minMax={[20000, 60000]}
    />
  )
}
export default SettingsPhone
