import SettingEntry from "@/components/app/settings/SettingEntry"
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import * as convert from 'color-convert'

interface SettingsEntryNumberInputWrapperProps {
  text: string
  hoverText?: string
  useStoreProps: {
    prop: (number | null), setProp: ((prop: number | null) => void)
  }
  minMax: [number, number]
  children?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}

const ActionColor = '#FF5F15'

const SettingsEntryNumberInputWrapper = ({ text, hoverText, useStoreProps, minMax, children }: SettingsEntryNumberInputWrapperProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [localPort, setLocalPort] = useState<number | ''>('')
  const textRef = useRef<HTMLParagraphElement>(null)
  const useStorePropsRef = useRef<SettingsEntryNumberInputWrapperProps['useStoreProps']>(useStoreProps)
  const minMaxRef = useRef<SettingsEntryNumberInputWrapperProps['minMax']>(minMax)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPort(+e.target.value | 0)
    !e.target.value && setLocalPort('')
  }

  useEffect(() => {
    if (!textRef.current) return
    if (+localPort < minMaxRef.current[0] || +localPort > minMaxRef.current[1] || localPort === '') {
      textRef.current.style.color! = 'red'
      useStorePropsRef.current.setProp(null)
    }
    else {
      textRef.current.style.color! = 'white'
      useStorePropsRef.current.setProp(+localPort)
    }
  }, [localPort])

  useEffect(() => {
    if (useStoreProps.prop === null) return
    setLocalPort(useStoreProps.prop)
  }, [useStoreProps.prop])

  return (
    <SettingEntry
      textRef={textRef}
      text={text}
      hoverText={[hoverText, ...minMax]}
    >
      <>{ children }</>
      <motion.input
        type="number"
        className='text-right w-[20%] [appearance:textfield] outline-none rounded-lg border-2 border-transparent
          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-4'
        onChange={handleOnChange}
        value={localPort}
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
export default SettingsEntryNumberInputWrapper
