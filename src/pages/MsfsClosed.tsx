import TopographicBackground from "@/components/global/TopographicBackground"
import { useInterval } from "@/hooks/useInterval"
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import animationData from '@/assets/waiting.json'
import { useRef, useState } from "react"
import { motion, useAnimationControls, Variants } from 'framer-motion'

const dotsOptions = [
	'\u00A0\u00A0\u00A0',
	'.\u00A0\u00A0',
	'..\u00A0',
	'...'
]

const animationVariants: Variants = {
	initial: {
		translateX: '-50%',
		translateY: '-80%',
		scale: 2.3
	},
	animate: { translateX: '100%' }
}
const animationTime = 400

const MsfsClosed = () => {
	const [dots, setDots] = useState<{ v: string, i: number }>({ v: dotsOptions[1], i: 1 })
  const animRef = useRef<LottieRefCurrentProps | null>(null)
	const controls = useAnimationControls()

	useInterval(() => {
		let newIndex: number
		newIndex = dots.i + 1
		if (newIndex === 4) newIndex = 0
		setDots({ v: dotsOptions[newIndex], i: newIndex })
	}, 500)

  return (<>
    <TopographicBackground steps={100} startHue={360} endHue={270} />
		<motion.div
			animate={controls}
			transition={{
				duration: animationTime / 1000,
				ease: 'backIn'
			}}
			variants={animationVariants}
			initial='initial'
			className='absolute top-1/2 left-1/2'
			onAnimationComplete={() => controls.set('initial')}
		>
			<Lottie
				lottieRef={animRef}
				animationData={animationData}
				autoPlay
				loop={false}
				onComplete={() => {
					controls.start('animate')
					setTimeout(() => animRef.current?.goToAndPlay(0, true), animationTime)
				}}
			/>
		</motion.div>
		<div className='mt-[220px] text-5xl z-0 flex'>
			<h1 className=''>Waiting for MSFS2020</h1>
			<h1 className='ml-1 tracking-widest'>{ dots.v }</h1>
		</div>
  </>)
}
export default MsfsClosed
