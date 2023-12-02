import SVG from '@/components/global/SVG'
import svgImg from '@/assets/settings.svg'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSearchParams } from '@/hooks/useSearchParams'
import { useRef, useState } from 'react'
import { useInlineStyleObserver } from '@/hooks/useInlineStyleObserver'

const SettingsIcon = () => {
  const [color, setColor] = useState<string>('white')
  const colorRef = useRef<HTMLDivElement>(null)
	const [lastSettingsPage] = useSearchParams(null)
  const settingsPageUrl = lastSettingsPage || '/settings/phone'

  useInlineStyleObserver(colorRef, setColor, 'color')

  return (
    <Link to={`${settingsPageUrl}?animate=1`} className='fixed left-0 top-0 border-[20px]
      border-white outline-none rounded-[100px] backdrop-blur-3xl transition-colors
      backdrop-brightness-200 cursor-pointer hover:border-[#FF5] duration-500
      ml-9 mt-9 scale-[.15] -translate-x-1/2 -translate-y-1/2'
    >
      <motion.div
        ref={colorRef}
        className='text-white'
        whileHover={{
          rotateZ: 360,
          color: '#FF5'
        }}
        transition={{
          ease: 'easeOut',
          duration: .5
        }}
      >
        <SVG src={svgImg} color={color} />
      </motion.div>
    </Link>
  )
}
export default SettingsIcon
