import svgImg from '@/assets/leftArrow.svg'
import SVG from "@/components/global/SVG"
import SaveButton from '@/components/app/settings/SaveButton'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInlineStyleObserver } from '@/hooks/useInlineStyleObserver'

interface TitleBarProps {
  onPageChange: () => void
}

const TitleBar = ({ onPageChange }: TitleBarProps) => {
  const [color, setColor] = useState<string>('white')
  const colorRef = useRef<HTMLDivElement>(null)

  useInlineStyleObserver(colorRef, setColor, 'color')

  return (
    <div className='relative w-full h-[11vh] bg-[#1A1A1E]'>
      <motion.div
        ref={colorRef}
        onClick={onPageChange}
        className='fixed left-0 top-0 cursor-pointer ml-8 mt-[27.5px]
          scale-[.07] -translate-x-1/2 -translate-y-1/2 text-white'
        whileHover={{
          color: '#FF5F15',
          transition: { duration: .2 }
        }}
      >
        <SVG src={svgImg} color={color} />
      </motion.div>
      <h1 className='absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 text-4xl'>SETTINGS</h1>
      <div className='fixed right-0 top-0 -translate-x-[10%] translate-y-[15%]'>
        <SaveButton />
      </div>
    </div>
  )
}
export default TitleBar
