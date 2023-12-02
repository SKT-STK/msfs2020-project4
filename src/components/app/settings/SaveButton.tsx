import {Variants, motion, useAnimationControls} from 'framer-motion'

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
  const controls = useAnimationControls()
  
  let doAnimate: boolean
  const handleOnAnimEnd = () => {
    doAnimate && controls.start('up')
    doAnimate = false
  }

  return (
    <motion.button
      type="button"
      className='text-[22px] py-1 px-3 border-2 border-slate-700 rounded-xl text-white'
      animate={controls}
      variants={animationVariants}
      initial='up'
      whileHover={{
        borderColor: ActionColor
      }}
      onClick={() => { controls.start('down'); doAnimate = true }}
      onAnimationComplete={handleOnAnimEnd}
    >SAVE</motion.button>
  )
}
export default SaveButton
