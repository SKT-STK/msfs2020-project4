import { useSettingsLayoutStore } from '@/data/useSettingsLayoutStore'
import { useSettingsStore } from '@/data/useSettingsStore'
import { Variants, motion, useAnimationControls } from 'framer-motion'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useRef } from 'react'
import animationData from '@/assets/saved.json'
import { useLocation } from 'react-router-dom'

const ActionColor = '#FF5F15'
const DefaultColor = '#1A1A1A'

const animationVariants: Variants = {
  down: {
    color: DefaultColor,
    scale: 0.9,
    rotate: '-2.5deg',
    backgroundColor: ActionColor
  },
  up: {
    color: 'white',
    scale: 1,
    rotate: '0deg',
    backgroundColor: DefaultColor
  },
  moveLeft: {
    translateX: '-50%',
    color: DefaultColor,
    scale: 0.9,
    rotate: '-2.5deg',
    backgroundColor: ActionColor
  },
  moveRight: {
    translateX: 0,
    color: 'white',
    scale: 1,
    rotate: '0deg',
    backgroundColor: DefaultColor
  }
}

const SaveButton = () => {
  const { settings } = useSettingsStore()
  const { setShowPopup } = useSettingsLayoutStore()
  const controls = useAnimationControls()
  const doAnimate = useRef<boolean>(false)
  const animateUp = useRef<boolean>(true)
  const animRef = useRef<LottieRefCurrentProps>(null)
  const location = useLocation()

  const handleOnAnimEnd = () => {
    if (!doAnimate.current) return
    doAnimate.current = false
    animateUp.current && controls.start('up')
  }

  const handleOnClick = () => {
    doAnimate.current = true
    controls.start('down')

    let doSave = true
    const spreadSettings = [...Object.values(settings)]
    const spreadKeys = [...Object.keys(settings)]
    const urlParts = location.pathname.split('?')[0].split('/')
    const keyToCheck = urlParts[urlParts.length - 1]
    spreadSettings.forEach((v, i) => {
      if (v === null && spreadKeys[i].startsWith(keyToCheck)) {
        setShowPopup(true)
        doSave = false
      }
    })

    if (!doSave) return
    animateUp.current = false
    animRef.current?.goToAndStop(0, true)
    controls.start('moveLeft').then(() => {
    animRef.current?.goToAndPlay(0, true)
    })
    window.ipcRenderer.send('save-settings', settings)
  }

  return (
    <motion.div
      className='fixed right-0 top-0 -translate-x-[10%] translate-y-[15%]'
    >
      <motion.button
        type="button"
        className='text-[22px] py-1 px-3 border-2 border-slate-700
          rounded-xl hover:border-[#FF5F15] transition-colors duration-300'
        animate={controls}
        variants={animationVariants}
        initial='up'
        onClick={handleOnClick}
        onAnimationComplete={handleOnAnimEnd}
      >SAVE</motion.button>
      <div className='relative'>
        <Lottie
          lottieRef={animRef}
          className='absolute left-1/2 top-0 -translate-y-[105%] scale-125 origin-center z-[-1]'
          animationData={animationData}
          loop={false}
          onComplete={() => controls.start('moveRight').then(() => { animateUp.current = true })}
        />
      </div>
    </motion.div>
  )
}
export default SaveButton
