import vid from '@/assets/videos/topography.mp4'
import { useEffect, useRef } from "react"

interface TopographicBackgroundProps {
  steps: number
  startHue: number
  endHue: number 
}

const TopographicBackground = ({ steps, startHue, endHue }: TopographicBackgroundProps) => {
  const bgRef = useRef<HTMLVideoElement>(null)

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

  return (<section>
    <video autoPlay loop muted ref={bgRef}
      className='absolute z-[-100] top-0 left-0 min-h-screen scale-[1.27] blur-[1.5px]'
    >
      <source src={vid} type="video/mp4" />
    </video>
    { generateGradient(steps, startHue, endHue) }
  </section>)
}
export default TopographicBackground
