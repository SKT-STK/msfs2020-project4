import { ReactNode, useState } from "react"

import generateRandomString from "@/functions/GenerateRandomString"
import { motion } from "framer-motion"
import { useInterval } from "@/hooks/useInterval"


interface ToggleSwitchProps {
  children: [ReactNode, ReactNode, ReactNode]
  callback?: (val: CBOOL, setNew: CBOOL) => CBOOL
  className?: string
}

const ToggleSwitch = ({ children, callback, className }: ToggleSwitchProps) => {
  const [checked, setChecked] = useState<CBOOL>(0)
  const [setNew, setSetNew] = useState<CBOOL>(0)

  const id = generateRandomString(10)

  useInterval(() => {
    if (callback) setChecked(callback(checked, setNew))
    setSetNew(0)
  }, 200)

  const handleOnChange = () => {
    setChecked(c => c === 0 ? 1 : 0)
    setSetNew(1)
  }

  return (<div className={className} style={{width: '384px'}}>
    <input type="checkbox" id={id} className='hidden' onChange={handleOnChange} value={checked} />
    <label htmlFor={id}
      className='border-[10px] border-solid border-[#767] p-5 rounded-full text-center
        text-4xl font-black relative block w-full cursor-pointer select-none'
    >
      <div>{ children[0] }</div>
      <div className='absolute left-0 top-0 w-full h-full rounded-full
        z-[-1] backdrop-blur-[7px] brightness-200'
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
