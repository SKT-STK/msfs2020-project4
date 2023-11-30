import { motion } from "framer-motion"
import { ReactNode, useEffect, useRef, useState } from "react"
import Lottie, { LottieRefCurrentProps } from "lottie-react"
import animationData from '@/assets/transition.json'

interface PageTransitionLayoutProps {
  children: ReactNode
}

const PageTransitionLayout = ({ children }: PageTransitionLayoutProps) => {
  const [isAnimFinished, setIsAnimFinished] = useState<boolean>(false)
  const animRef = useRef<LottieRefCurrentProps | null>(null)

  useEffect(() => {
    animRef.current?.setSpeed(1.4)
    animRef.current?.goToAndPlay(10, true)
  }, [])

  return (<>
    { children }
    <motion.div
      className='fixed top-0 left-0 w-full h-screen bg-[#0F0F0F] origin-bottom'
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{
        duration: .8,
        ease: [.22, 1, .36, 1]
      }}
    />
    <motion.div
      className='fixed top-0 left-0 w-full h-screen bg-[#0F0F0F] origin-top'
      initial={{ scaleY: 1 }}
      animate={isAnimFinished ? { scaleY: 0 } : {}}
      exit={{ scaleY: 0 }}
      transition={{
        duration: .8,
        ease: [.22, 1, .36, 1],
      }}
    >
      <Lottie
        className='absolute w-screen h-screen scale-[1.5] rotate-12
          translate-x-[15%] translate-y-[10%] bg-transparent'
        lottieRef={animRef}
        animationData={animationData}
        autoplay={false}
        loop={false}
        onComplete={() => setIsAnimFinished(true)}
      />
    </motion.div>
  </>)
}
export default PageTransitionLayout
