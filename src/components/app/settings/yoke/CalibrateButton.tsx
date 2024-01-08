import { useSettingsStore } from '@/data/useSettingsStore'
import { useOnIpc } from '@/hooks/useOnIpc'
import { ipcRenderer } from 'electron'
import { Variants, motion, useAnimationControls } from 'framer-motion'

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

const CalibrateButton = () => {
  const controls = useAnimationControls()
  const {
    yoke_SetRoll,
    yoke_SetPitch,
  } = useSettingsStore()

  const handleOnClick = () => {
    controls.start('down')
      .then(() => controls.start('up'))

    ipcRenderer.send('create-yoke-calib-page')
  }

  useOnIpc('did-close-yoke-calib-win', (_, args) => {
    const rot = args as [number, number]
    rot[0] != -1 && yoke_SetRoll(rot[0])
    rot[1] != -1 && yoke_SetPitch(rot[1])
  })

  return (
    <motion.button
      animate={controls}
      variants={animationVariants}
      initial='up'
      type="button"
      className='absolute bottom-4 right-4 border-[2px] border-slate-700 py-2 px-3 rounded-xl
        text-2xl transition-colors duration-300 hover:border-[#FF5F15]'
      onClick={handleOnClick}
    >
      CONFIGURE
    </motion.button>
  )
}
export default CalibrateButton
