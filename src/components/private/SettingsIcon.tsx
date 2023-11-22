import SVG from '@/components/global/SVG'
import svgImg from '@/assets/settings.svg'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SettingsIcon = () => {
  return (
    <Link to='/settings' className='fixed left-0 top-0 border-[20px]
      border-white outline-none rounded-[100px] backdrop-blur-3xl
      backdrop-brightness-200 cursor-pointer hover:border-[#FF5]
      ml-9 mt-9 scale-[.15] -translate-x-1/2 -translate-y-1/2'
    >
      <motion.div
        whileHover={{
          rotateZ: 360
        }}
        transition={{
          ease: 'easeOut',
          duration: .5
        }}
      >
        <SVG src={svgImg} color={hover => hover ? '#FF5' : 'white'} />
      </motion.div>
    </Link>
  )
}
export default SettingsIcon
