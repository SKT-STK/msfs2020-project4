import Lottie from "lottie-react"
import animationData from '@/assets/fileError.json'

const SettingsError = () => {
  return (<>
    <main className='flex w-full min-h-screen flex-col'>
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
          animationData={animationData}
          loop={true}
          autoplay={true}
        />        
      </div>
      <div className='min-h-[30vh] w-full flex items-center justify-center text-center'>
        <h1>TODO: Button!</h1>
      </div>
    </main>
  </>)
}
export default SettingsError
