import { useEffect, useRef } from "react"
import { Variants, motion, useAnimationControls } from 'framer-motion'
import { useLocation, useNavigate } from "react-router-dom"
import Lottie, { LottieRefCurrentProps } from "lottie-react"
import animationData from '@/assets/transition.json'
import { useSearchParams } from "@/hooks/useSearchParams"
import { useSettingsLayoutStore } from "@/data/useSettingsLayoutStore"

const animationOutVariants: Variants = {
  initial: {
    scaleY: 0
  },
  animate: {
    scaleY: 1
  }
}

const animationInVariants: Variants = {
  initial: {
    scaleY: 1
  },
  animate: {
    scaleY: 0
  }
}

const SettingsAnimationDivs = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const controlsOut = useAnimationControls()
  const controlsIn = useAnimationControls()
  const animRef = useRef<LottieRefCurrentProps>(null)
  const [doAnimate] = useSearchParams(location as unknown as Location)
  const { startOutAnim, setStartOutAnim } = useSettingsLayoutStore()

  useEffect(() => {
    if (!((doAnimate && !+doAnimate) || !doAnimate)) return
    controlsIn.set('animate')
  }, [controlsIn, doAnimate])

  useEffect(() => {
    if (!startOutAnim) return
    controlsOut.start('animate')
    setStartOutAnim(false)
    
  }, [controlsOut, setStartOutAnim, startOutAnim])

  useEffect(() => {
    animRef.current?.setSpeed(1.4)
    animRef.current?.goToAndPlay(10, true)
  }, [])

  return (<>
    <motion.div
      animate={controlsOut}
      variants={animationOutVariants}
      initial='initial'
      transition={{
        duration: .8,
        ease: [.22, 1, .36, 1]
      }}
      className='fixed top-0 left-0 w-full h-screen bg-[#0F0F0F] origin-bottom z-[100]'
      onAnimationComplete={() => navigate(`/?last-settings-page=${location.pathname}`)}
    />
    <motion.div
      animate={controlsIn}
      variants={animationInVariants}
      initial='initial'
      transition={{
        duration: .8,
        ease: [.22, 1, .36, 1]
      }}
      className='fixed top-0 left-0 w-full h-screen bg-[#0F0F0F] origin-top z-[100]'
    >
      <Lottie
        className='absolute w-screen h-screen scale-[1.5] rotate-12
          translate-x-[15%] translate-y-[10%] bg-transparent'
        lottieRef={animRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        onComplete={() => {
          doAnimate && +doAnimate && controlsIn.start('animate')
        }}
      />
    </motion.div>
  </>)
}
export default SettingsAnimationDivs
