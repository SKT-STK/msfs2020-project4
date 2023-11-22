import SVG from "@/components/global/SVG"
import warningSvg from '@/assets/warningSign.svg'
import TopographicBackground from "@/components/global/TopographicBackground"
import { motion } from "framer-motion"

const BackendCppErr = () => {
  return (<>
    <TopographicBackground steps={100} startHue={300} endHue={280} />
    <div className='backdrop-blur-[10px] backdrop-brightness-[1.75] w-full h-full top-0 left-0 absolute' />
    <SVG src={warningSvg} color='#F55' className='absolute scale-[.25] origin-centre top-1/2 left-1/2
      -translate-x-1/2 -translate-y-[60%]' />
    <h1 className='mt-[180px] mb-[25px] text-4xl z-0'>An Error Occurred While Trying to Initialize the C++ Backend</h1>
    <motion.button type="button" className='z-0 p-2 border-4 text-2xl rounded-2xl'
      whileHover={{
        color: '#F55',
        boxShadow: '0 0 10px 10px #F55',
        borderColor: '#F55',
      }}
      transition={{
        duration: .05,
        ease: 'easeInOut',
      }}
      onClick={() => window.ipcRenderer.send('EXIT')}
    >CLOSE</motion.button>
  </>)
}
export default BackendCppErr
