import SettingsEntryTextFieldWrapper from "@/components/app/settings/SettingsEntryTextFieldWrapper"
import CalibrateButtonSettingsEntryNumberInputWrapperWrapper from "@/components/app/settings/throttles/CalibrateButtonSettingsEntryNumberInputWrapperWrapper"
import { useSettingsStore } from "@/data/useSettingsStore"

const SettingsThrottles = () => {
  const {
    settings: {
      throttles_Idle,
      throttles_ToGa,
      throttles_Easing,
    },
    throttles_SetIdle,
    throttles_SetToGa,
    throttles_SetEasing,
  } = useSettingsStore()

  return (<>
    <CalibrateButtonSettingsEntryNumberInputWrapperWrapper
      text='Throttles IDLE Position'
      hoverText='Joysticks&apos;s position in Xbox&apos;s units representing IDLE thrust.'
      useStoreProps={{ prop: throttles_Idle, setProp: throttles_SetIdle }}
      minMax={[-32768, 32767]}
    />
    <CalibrateButtonSettingsEntryNumberInputWrapperWrapper
      text='Throttles TO/GA Position'
      hoverText='Joysticks&apos;s position in Xbox&apos;s units representing TO/GA thrust.'
      useStoreProps={{ prop: throttles_ToGa, setProp: throttles_SetToGa }}
      minMax={[-32768, 32767]}
    />
    <SettingsEntryTextFieldWrapper
      text='Easing Function'
      hoverText='Normalized easing function for the throttles position. It allows you to make the
        IDLE-TO/GA range non-linear. Math functions like exp(), abs() and sin() are allowed. If you&apos;d
        like to reference &pi;, use &apos;PI&apos;, the same goes for Euler&apos;s number, use &apos;E&apos;. It
        is possible to just Ctrl+C Ctrl+V from Desmos Visualizer. In a case of invalid equation, linear function will be used.'
      useStoreProps={{ prop: throttles_Easing, setProp: throttles_SetEasing }}
    />
  </>)
}
export default SettingsThrottles
