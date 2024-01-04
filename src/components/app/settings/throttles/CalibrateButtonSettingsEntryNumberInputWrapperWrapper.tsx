import SettingsEntryNumberInputWrapper from "@/components/app/settings/SettingsEntryNumberInputWrapper"
import { Variants, motion, useAnimationControls } from "framer-motion"
import { useEffect, useState } from "react"

interface CalibrateButtonSettingsEntryNumberInputWrapperWrapperProps {
  text: string
  hoverText?: string
  useStoreProps: {
    prop: (number | null),
    setProp: ((prop: number | null) => void)
  }
  minMax: [number, number]
  buttonActiveText: string
}

const ActionColor = '#FF5F15'
const DefaultColor = '#1A1A1A'

const animationVariants: Variants = {
  down: {
    right: '-280%',
    // translateX: '300%'
  },
  up: {
    right: '20%',
  },
  left: {
    right: '820%',
    // translateX: '-780%'
  }
}

const CalibrateButtonSettingsEntryNumberInputWrapperWrapper = (
  {
    text,
    hoverText,
    useStoreProps,
    minMax,
    buttonActiveText
  }: CalibrateButtonSettingsEntryNumberInputWrapperWrapperProps
) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const controls = useAnimationControls()

  const handleOnClick = (btn: 'main' | 'accept') => {
    controls.start('down')
      .then(() => setClicked(!clicked))
      .then(() => controls.set('left'))
      .then(() => controls.start('up'))
  }

  useEffect(() => {
    controls.set('up')
  }, [controls])

  return (
    <SettingsEntryNumberInputWrapper
      text={text}
      hoverText={hoverText}
      useStoreProps={useStoreProps}
      minMax={minMax}
    >
      { !clicked ? <>
        <motion.button
          type="button"
          className='absolute right-[20%] mr-1 border-[2px] border-slate-700 rounded-lg py-[2px] px-[8px]
            transition-colors hover:border-[#FF5F15] duration-300 text-white'
          animate={controls}
          variants={animationVariants}
          onClick={() => handleOnClick('main')}
        >
          CONFIGURE
        </motion.button>
      </> : <>
        <motion.button
          type="button"
          className='absolute right-[20%] mr-1 border-[2px] border-[#FF5F15] rounded-lg py-[2px] px-[8px]
            bg-[#FF5F15] text-black'
          animate={controls}
          variants={animationVariants}
          onClick={() => handleOnClick('accept')}
        >
          { buttonActiveText }
        </motion.button>
      </> }
    </SettingsEntryNumberInputWrapper>
  )
}
export default CalibrateButtonSettingsEntryNumberInputWrapperWrapper
