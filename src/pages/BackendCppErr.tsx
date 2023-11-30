import SVG from "@/components/global/SVG"
import warningSvg from '@/assets/warningSign.svg'
import { motion } from "framer-motion"

const BackendCppErr = () => {
  return (<>
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
