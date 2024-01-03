import SettingsEntryNumberInputWrapper from "../SettingsEntryNumberInputWrapper"

interface CalibrateButtonSettingsEntryNumberInputWrapperWrapperProps {
  text: string
  hoverText?: string
  useStoreProps: {
    prop: (number | null), setProp: ((prop: number | null) => void)
  }
  minMax: [number, number]
}

const CalibrateButtonSettingsEntryNumberInputWrapperWrapper = (
  {
    text,
    hoverText,
    useStoreProps,
    minMax
  }: CalibrateButtonSettingsEntryNumberInputWrapperWrapperProps
) => {
  return (
    <SettingsEntryNumberInputWrapper
      text={text}
      hoverText={hoverText}
      useStoreProps={useStoreProps}
      minMax={minMax}
    >
      <button
        type="button"
        className='absolute right-[20%] mr-1 border-[2px] border-slate-700 rounded-lg py-[2px] px-[8px]
          transition-colors hover:border-[#FF5F15] duration-300'
      >
        CALIBRATION
      </button>
    </SettingsEntryNumberInputWrapper>
  )
}
export default CalibrateButtonSettingsEntryNumberInputWrapperWrapper
