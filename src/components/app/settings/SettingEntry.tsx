import { ReactNode, RefObject, useRef } from "react"
import { Variants, motion, useAnimationControls } from 'framer-motion'
import { useMousePos } from "@/hooks/useMousePos"

interface SettingEntryProps {
  text: string
  textRef?: RefObject<HTMLParagraphElement>
  hoverText: [string | undefined, number | undefined, number | undefined]
  children: ReactNode
}

const animationVariants: Variants = {
  hidden: {
    opacity: 0
  },
  shown: {
    opacity: 1
  }
}

const SettingEntry = ({ text, textRef, hoverText, children }: SettingEntryProps) => {
  const mousePos = useMousePos()
  const controls = useAnimationControls()
  const hoverRef = useRef<HTMLDivElement>(null)

  const handleMouseOver = () => {
    hoverRef.current && (hoverRef.current.style.transform = `translate(${mousePos.x}px, ${mousePos.y}px)`)
    setTimeout(() => {
      controls.start('shown')
    }, 200)
  }

  const generateHoverText: () => ReactNode = () => {
    if (hoverText[0] && hoverText[1] && hoverText[2]) {
      return (<>
        { hoverText[0] }
        <br />
        { `(\u00A0${hoverText[1]}\u00A0-\u00A0${hoverText[2]}\u00A0)` }
      </>)
    }
    else if (hoverText[0] && !(hoverText[1] && hoverText[2])) {
      return hoverText[0]
    }
    return text
  }

  return (<>
    <motion.div
      ref={hoverRef}
      className='absolute bg-[#1A1A1A] pointer-events-none top-0 left-0 border-2 border-amber-400 p-1 rounded-md max-w-[300px]'
      animate={controls}
      variants={animationVariants}
      initial='hidden'
    >
      <p className='font-inconsolata px-2 text-center'>{ generateHoverText() }</p>
    </motion.div>
    <div className='w-full h-[10%] flex items-center justify-between border-b-slate-700 [&:not(:last-child)]:border-b-[1px]'>
      <p
        ref={textRef}
        className='text-xl cursor-help'
        onMouseEnter={handleMouseOver}
        onMouseLeave={() => setTimeout(() => controls.start('hidden'), 200)}
      >{ text }</p>
      { children }
    </div>
  </>)
}
export default SettingEntry
