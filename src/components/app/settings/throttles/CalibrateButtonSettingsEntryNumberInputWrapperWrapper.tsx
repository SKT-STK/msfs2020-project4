import SettingsEntryNumberInputWrapper from "@/components/app/settings/SettingsEntryNumberInputWrapper"
import { useInterval } from "@/hooks/useInterval"
import { useOnIpc } from "@/hooks/useOnIpc"
import { Variants, motion, useAnimationControls } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface CalibrateButtonSettingsEntryNumberInputWrapperWrapperProps {
  text: string
  hoverText?: string
  useStoreProps: {
    prop: (number | null),
    setProp: ((prop: number | null) => void)
  }
  minMax: [number, number]
  buttonActiveText: string
  udpPath: string
}

const animationVariants: Variants = {
  down: {
    right: '-280%',
  },
  up: {
    right: '20%',
  },
  left: {
    right: '820%',
  }
}

const CalibrateButtonSettingsEntryNumberInputWrapperWrapper = (
  {
    text,
    hoverText,
    useStoreProps,
    minMax,
    buttonActiveText,
    udpPath
  }: CalibrateButtonSettingsEntryNumberInputWrapperWrapperProps
) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const [delay, setDelay] = useState<number | null>(null)
  const controls = useAnimationControls()
  const ry = useRef<number>(-1)

  const handleOnClick = (btn: 'main' | 'accept') => {
    controls.start('down')
      .then(() => setClicked(!clicked))
      .then(() => controls.set('left'))
      .then(() => controls.start('up'))

    if (btn === 'main') {
      setDelay(50)
    }
    else if (btn === 'accept') {
      useStoreProps.setProp(ry.current)
      setDelay(null)
    }
  }

  useOnIpc(udpPath, (_, args) => {
    const data = args as number
    ry.current = data
  })

  useInterval(() => {
    window.ipcRenderer.send('udp', {path: udpPath, msg: {}})
  }, delay)

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
