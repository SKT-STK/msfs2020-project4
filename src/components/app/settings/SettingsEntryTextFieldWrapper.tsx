import SettingEntry from "@/components/app/settings/SettingEntry"
import { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion'
import * as convert from 'color-convert'

interface SettingsEntryTextFieldWrapperProps {
  text: string
  hoverText?: string
  useStoreProps: {
    prop: (string | null), setProp: ((prop: string | null) => void)
  }
}

const ActionColor = '#FF5F15'

const SettingsEntryTextFieldWrapper = ({ text, hoverText, useStoreProps }: SettingsEntryTextFieldWrapperProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const textRef = useRef<HTMLParagraphElement>(null)
  const [local, setLocal] = useState<string>('')
  const useStorePropsRef = useRef<SettingsEntryTextFieldWrapperProps['useStoreProps']>(useStoreProps)

  useEffect(() => {
    if (!textRef.current) return
    if (local.length === 0) {
      textRef.current.style.color! = 'red'
      useStorePropsRef.current.setProp(null)
    }
    else {
      textRef.current.style.color! = 'white'
      useStorePropsRef.current.setProp(local)
    }
  }, [local])

  useEffect(() => {
    if (useStoreProps.prop === null) return
    setLocal(useStoreProps.prop)
  }, [useStoreProps.prop])
  
  return (
    <SettingEntry
      textRef={textRef}
      text={text}
      hoverText={[hoverText, undefined, undefined]}
    >
      <motion.textarea
        rows={2}
        className='resize-none w-1/2 font-inconsolata outline-none rounded-lg
          border-2 border-transparent leading-tight'
        onChange={e => setLocal(e.target.value)}
        value={local}
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
