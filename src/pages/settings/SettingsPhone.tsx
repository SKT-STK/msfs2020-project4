import SettingEntry from "@/components/app/settings/SettingEntry"
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import * as convert from 'color-convert'

const ActionColor = '#FF5F15'

const SettingsPhone = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [port, setPort] = useState<number>(0)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!textRef.current) return
    if (port < 20_000 || port > 60_000) {
      textRef.current.style.color! = 'red'
    }
    else {
      textRef.current.style.color! = 'white'
    }
  }, [port])

  return (
    <div className='flex flex-col w-full h-full'>
      <SettingEntry
        textRef={textRef}
        text='Wireless Port'
        hoverText='Networking port used to receive data from smartphone&apos;s app. (&nbsp;20&apos;000 - 60&apos;000 )'
      >
        <motion.input
          type="number"
          className='text-right w-1/4 [appearance:textfield] outline-none rounded-lg border-2 border-transparent
            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-4'
          onChange={e => setPort(+e.target.value)}
          value={port}
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
    </div>
  )
}
export default SettingsPhone

// port to be used
