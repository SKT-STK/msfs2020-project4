import SettingEntry from "@/components/app/settings/SettingEntry"
import { useRef, useState } from "react"
import { motion } from 'framer-motion'
import * as convert from 'color-convert'

interface SettingsEntryTextFieldWrapperProps {
  text: string
  hoverText?: string
}

const ActionColor = '#FF5F15'

const SettingsEntryTextFieldWrapper = ({ text, hoverText }: SettingsEntryTextFieldWrapperProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const textRef = useRef<HTMLParagraphElement>(null)
  
  return (
    <SettingEntry
      textRef={textRef}
      text={text}
      hoverText={[hoverText, undefined, undefined]}
    >
      <motion.textarea
        rows={2}
        className='resize-none w-1/2 font-inconsolata outline-none rounded-lg border-2 border-transparent leading-tight'
        whileFocus={{
          borderColor: ActionColor
        }}
        whileHover={!isFocused ? {
          borderColor: 'hsl(' + (convert.hex.hsl(ActionColor)[0])
            + ', ' + (convert.hex.hsl(ActionColor)[1] / 1.2)
            + ', ' + (convert.hex.hsl(ActionColor)[2] * 1.2) + ')'
        } : {}}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        transition={{
          ease: 'easeInOut',
          duration: .2
        }}
      />
    </SettingEntry>
  )
}
export default SettingsEntryTextFieldWrapper
