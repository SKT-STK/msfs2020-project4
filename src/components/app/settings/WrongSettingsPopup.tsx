import animationData from '@/assets/animations/warningSign.json'
import { useSettingsLayoutStore } from "@/data/useSettingsLayoutStore"
import { Variants, motion, useAnimationControls } from "framer-motion"
import Lottie from "lottie-react"
import { useEffect, useRef } from "react"

const animateVariants: Variants = {
  shown: {
    opacity: .825
  },
  hidden: {
    opacity: 0
  }
}

const WrongSettingsPopup = () => {
  const { showPopup, setShowPopup } = useSettingsLayoutStore()
  const controls = useAnimationControls()
  const execTimeout = useRef<boolean>(true)

  const handleOnClick = () => {
    setShowPopup(false)
    controls.start('hidden')
    execTimeout.current = false
  }

  useEffect(() => {
    if (!showPopup) return
    execTimeout.current = true
    controls.start('shown')
    setTimeout(() => {
      if (!execTimeout.current) return
      controls.start('hidden').then(() => setShowPopup(false))
    }, 5000)
  })

  return (
    <motion.div
      className='fixed left-1/2 -translate-x-1/2 flex-col items-center justify-center text-center px-5 z-[1]
        w-[300px] h-[200px] bg-[#0F0F0F] border-2 border-slate-700 rounded-3xl top-[5%] cursor-pointer'
      style={{ display: showPopup ? 'flex' : 'none' }}
      onClick={handleOnClick}
      animate={controls}
      variants={animateVariants}
      initial='hidden'
    >
      <p className='font-inconsolata text-xl'>One or more settings are incorrect.</p>
      <div className='w-full h-14 relative'>
        { showPopup ? <Lottie
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center scale-50'
          animationData={animationData}
          loop
          autoPlay
        /> : <></> }
      </div>
      <p className='font-inconsolata text-xl'>Please correct them before saving.</p>
    </motion.div>
  )
}
export default WrongSettingsPopup
