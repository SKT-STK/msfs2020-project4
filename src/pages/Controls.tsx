import vid from '@/assets/topography.mp4'
import { useEffect, useRef } from 'react'
import ServerToggleSwitch from '@/components/ServerToggleSwitch'

const Controls = () => {
  const bgRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (bgRef.current?.playbackRate) bgRef.current.playbackRate = 0.7
  }, [])

  const generateGradient = (steps: number, startRotation: number, endRotation: number) => {
    const sections: JSX.Element[] = []
    const diff = endRotation - startRotation
    const stepUp = diff / (steps - 1)
    const posStepUp = 100 / steps

    let curHue: number = startRotation - stepUp
    let curPos: number = -posStepUp
    for (let i: number = 0; i < steps; i++) {
      curHue += stepUp
      curPos += posStepUp
      sections.push(<div key={i}
        className={`absolute inline-block top-0 h-full z-[-99]`}
        style={{backdropFilter: `brightness(0.5) sepia(1) saturate(100)
          hue-rotate(${Math.abs(curHue)}deg)`, left: `${Math.abs(curPos)}%`, width: `${Math.abs(posStepUp)}%`}}
      />)
    }
    return sections
  }

  return (<>
    <div>
      <video autoPlay loop ref={bgRef}
        className='absolute z-[-100] top-0 left-0 min-h-screen scale-[1.27] blur-[1.5px]'>
        <source src={vid} type="video/mp4" />
      </video>
      { generateGradient(100, 320, 230) }
    </div>
		<main className='flex justify-center items-center min-h-screen w-full flex-row'>
			<section className='flex justify-center items-center min-h-screen w-full
				flex-col flex-[5] border-r-4 border-[#767C]'>
				<ServerToggleSwitch udpPath='/yoke' className='my-5'>{[ 'YOKE', '✈️', '🛩️' ]}</ServerToggleSwitch>
				<ServerToggleSwitch udpPath='/thrust' className='my-5'>{[ 'THROTTLE', '🚀', '🚀' ]}</ServerToggleSwitch>
        <ServerToggleSwitch udpPath='/reverses' className='my-5'>{[ 'REVERSES', '🛫', '🛬' ]}</ServerToggleSwitch>
			</section>
			<section className='flex justify-center items-center min-h-screen w-full flex-col flex-[2] backdrop-blur-md brightness-200'>
				
			</section>
		</main>
  </>)
}
export default Controls
