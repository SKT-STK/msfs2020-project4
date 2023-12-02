import { useSettingsLayoutStore } from '@/data/useSettingsLayoutStore'
import { useSettingsStore } from '@/data/useSettingsStore'
import { Variants, motion, useAnimationControls } from 'framer-motion'
import { useRef } from 'react'

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
  }
}

const SaveButton = () => {
  const { settings } = useSettingsStore()
  const { setShowPopup } = useSettingsLayoutStore()
  const controls = useAnimationControls()
  const doAnimate = useRef<boolean>(false)

  const handleOnAnimEnd = () => {
    if (!doAnimate.current) return
    doAnimate.current = false
    controls.start('up')
  }

  const handleOnClick = () => {
    doAnimate.current = true
    controls.start('down')

    let doSave = true
    const spreadSettings = [...Object.values<unknown>(settings)]
    spreadSettings.forEach(v => {
      if (v === null) {
        setShowPopup(true)
        doSave = false
      }
    })

    doSave && window.ipcRenderer.send('save-settings', settings)
  }

  return (
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
  )
}
export default SaveButton
