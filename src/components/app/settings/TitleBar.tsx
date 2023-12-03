import svgImg from '@/assets/leftArrow.svg'
import SVG from "@/components/global/Svg"
import SaveButton from '@/components/app/settings/SaveButton'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInlineStyleObserver } from '@/hooks/useInlineStyleObserver'
import { useSettingsLayoutStore } from '@/data/useSettingsLayoutStore'

const TitleBar = () => {
  const [color, setColor] = useState<string>('white')
  const colorRef = useRef<HTMLDivElement>(null)
  const { setStartOutAnim } = useSettingsLayoutStore()

  useInlineStyleObserver(colorRef, setColor, 'color')

  return (
    <div className='relative w-full h-[11vh] bg-[#1A1A1E]'>
      <motion.div
        ref={colorRef}
        onClick={() => setStartOutAnim(true)}
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
      <SaveButton />
    </div>
  )
}
export default TitleBar
