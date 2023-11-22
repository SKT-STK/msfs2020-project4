import { ReactNode, useState } from "react"

import generateRandomString from "@/functions/GenerateRandomString"
import { motion } from "framer-motion"
import { useInterval } from "@/hooks/useInterval"


interface ToggleSwitchProps {
  children: [ReactNode, ReactNode, ReactNode, string]
  serverCallback?: (setNew: CBOOL) => CBOOL
  clientCallback?: (val: CBOOL) => void
  className?: string
}

const ToggleSwitch = ({ children, serverCallback, clientCallback, className }: ToggleSwitchProps) => {
  const [checked, setChecked] = useState<CBOOL>(0)
  const [setNew, setSetNew] = useState<CBOOL>(0)
  const [color, setColor] = useState<string>('#767')

  const id = generateRandomString(10)
  
  useInterval(() => {
    if (serverCallback) setChecked(serverCallback(setNew))
    setSetNew(0)
  }, serverCallback !== undefined ? 50 : null)

  const handleOnChange = () => {
    if (!serverCallback && clientCallback) {
      setChecked(c => c === 0 ? 1 : 0)
      clientCallback(checked)
    }
    else setSetNew(1)
    setColor(checked === 0 ? children[3] : '#767')
  }

  return (<div className={className} style={{width: '384px'}}>
    <input type="checkbox" id={id} className='hidden' onChange={handleOnChange} value={checked} />
    <label htmlFor={id}
      className='border-[10px] border-solid p-5 rounded-full text-center
        text-4xl font-black relative block w-full cursor-pointer select-none'
      style={{
        borderColor: color,
      }}
    >
      <div>{ children[0] }</div>
      <div className='absolute left-0 top-0 w-full h-full rounded-full
        z-[-1] backdrop-blur-md brightness-200'
      />
      <motion.div className='absolute text-center grid place-content-center text-black
        bg-white top-1 left-1 h-[72px] rounded-full'
        animate={checked === 1 ? {
          x: ['0px', '0px', '0px', '284px'],
          width: ['72px', '356px', '356px', '72px'],
        } : {
          x: ['284px', '0px', '0px', '0px'],
          width: ['72px', '356.01px', '356px', '72px'],
        }}
        transition={{
          duration: .2,
          ease: 'easeInOut',
          times: [0, .4, .6, 1],
        }}
      >{ checked ? children[2] : children[1] }</motion.div>
    </label>
  </div>)
}
export default ToggleSwitch
