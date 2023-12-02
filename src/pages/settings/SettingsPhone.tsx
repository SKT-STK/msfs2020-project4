import SettingEntry from "@/components/app/settings/SettingEntry"
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react"
import * as convert from 'color-convert'
import { useSettingsStore } from "@/data/useSettingsStore"

const ActionColor = '#FF5F15'

const SettingsPhone = () => {
  const { phone_SetPort } = useSettingsStore()
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [localPort, setLocalPort] = useState<number>(0)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!textRef.current) return
    if (localPort < 20_000 || localPort > 60_000) {
      textRef.current.style.color! = 'red'
      phone_SetPort(null)
    }
    else {
      textRef.current.style.color! = 'white'
      phone_SetPort(localPort)
    }
  }, [localPort, phone_SetPort])

  return (
    <div className='flex flex-col w-full h-full'>
      <SettingEntry
        textRef={textRef}
        text='Wireless Port'
        hoverText='Networking port used to receive data from
          smartphone&apos;s app. (&nbsp;20&apos;000&nbsp;-&nbsp;60&apos;000&nbsp;)'
      >
        <motion.input
          type="number"
          className='text-right w-1/4 [appearance:textfield] outline-none rounded-lg border-2 border-transparent
            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pr-4'
          onChange={e => setLocalPort(+e.target.value)}
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
    </div>
  )
}
export default SettingsPhone

// port to be used
