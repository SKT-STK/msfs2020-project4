import TopographicBackground from "@/components/global/TopographicBackground"
import { useInterval } from "@/hooks/useInterval"
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import animationData from '@/assets/waiting.json'
import { useRef, useState } from "react"

type dotsOptionsType
	= '\u00A0\u00A0\u00A0'
	| '.\u00A0\u00A0'
	| '..\u00A0'
	| '...'
const dotsOptions:[
		dotsOptionsType,
		dotsOptionsType,
		dotsOptionsType,
		dotsOptionsType
	] = [
	'\u00A0\u00A0\u00A0',
	'.\u00A0\u00A0',
	'..\u00A0',
	'...'
]

const MsfsClosed = () => {
	const [dots, setDots] = useState<{ v: dotsOptionsType, i: number }>({ v: dotsOptions[1], i: 1 })
  const animRef = useRef<LottieRefCurrentProps | null>(null)

	useInterval(() => {
		window.ipcRenderer.send('udp', {path: '/msfs-status', msg: {}})

		let newIndex: number
		newIndex = dots.i + 1
		if (newIndex === 4) newIndex = 0
		setDots({ v: dotsOptions[newIndex], i: newIndex })
	}, 500)

  return (<>
    <TopographicBackground steps={100} startHue={360} endHue={270} />
		<Lottie
			className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] scale-[2.3]'
			lottieRef={animRef}
			animationData={animationData}
			autoPlay
			loop={false}
			onComplete={() => {
				animRef.current?.goToAndPlay(50, true)
			}}
		/>
		<div className='mt-[220px] text-5xl z-0 flex'>
			<h1 className=''>Waiting for MSFS2020</h1>
			<h1 className='ml-1 tracking-widest'>{ dots.v }</h1>
		</div>
  </>)
}
export default MsfsClosed
