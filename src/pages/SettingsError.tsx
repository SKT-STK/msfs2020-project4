import Lottie, { LottieRefCurrentProps } from "lottie-react"
import animationData_error from '@/assets/animations/fileError.json'
import animationData_takeoff from '@/assets/animations/airplaneTakeoff.json'
import animationData_landing from '@/assets/animations/airplaneLanding.json'
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"

const SettingsError = () => {
  const animRef_landing = useRef<LottieRefCurrentProps>(null)
  const animRef_takeoff = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    animRef_landing.current?.goToAndPlay(55, true)
    animRef_takeoff.current?.goToAndPlay(0, true)
  }, [])

  return (
    <Link
      to='/settings/phone?animate=1'
      className='flex w-full min-h-screen flex-col'
    >
      <div className='min-h-[40vh] w-full flex items-center justify-center text-center px-[50px]'>
        <p className='text-4xl'>
          Looks like one or more settings are invalid or missing!
          <br />
          <br />
          Correct them before using the app.
        </p>
      </div>
      <div className='min-h-[30vh] relative'>
        <Lottie
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-50'
          animationData={animationData_error}
          loop={true}
          autoplay={true}
        />        
      </div>
      <div className='min-h-[30vh] w-full flex items-center justify-center text-center'>
        <div className='w-[300px] h-[80px] rounded-lg relative bg-cover'>
          <Lottie
            lottieRef={animRef_takeoff}
            animationData={animationData_takeoff}
            className='absolute left-1/2 top-1/2 -translate-x-[160%] -translate-y-2/3 scale-125 scale-x-[2.2] z-[-1]'
            loop={true}
            autoplay={false}
          />
          <Lottie
            lottieRef={animRef_landing}
            animationData={animationData_landing}
            className='absolute left-1/2 top-1/2 translate-x-[60%] -translate-y-2/3 scale-125 scale-x-[2.2] z-[-1]'
            loop={true}
            autoplay={false}
          />
        </div>
      </div>
    </Link>
  )
}
export default SettingsError
