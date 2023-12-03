import { ReactNode, useState } from "react"
import generateRandomString from "@/functions/GenerateRandomString"
import { motion } from "framer-motion"
import { useInterval } from "@/hooks/useInterval"
import * as convert from 'color-convert'

interface ToggleSwitchProps {
  children: [ReactNode, ReactNode, ReactNode, string]
  serverCallback?: (setNew: boolean) => boolean
  clientCallback?: (val: boolean) => void
  className?: string
}

const ToggleSwitch = ({ children, serverCallback, clientCallback, className }: ToggleSwitchProps) => {
  const [checked, setChecked] = useState<boolean>(false)
  const [setNew, setSetNew] = useState<boolean>(false)
  const [color, setColor] = useState<string>('#FFF')

  const id = generateRandomString(10)
  
  useInterval(() => {
    if (!serverCallback) return
    const newVal = serverCallback(setNew)
    setChecked(newVal)
    setColor(newVal ? children[3] : '#FFF')
    setSetNew(false)
  }, serverCallback !== undefined ? 50 : null)

  const handleOnChange = () => {
    if (!serverCallback && clientCallback) {
      const futureChecked = !checked
      setChecked(futureChecked)
      clientCallback(futureChecked)
      setColor(futureChecked ? children[3] : '#FFF')
    }
    else setSetNew(true)
  }

  return (<div className={className} style={{ width: '384px' }}>
    <input type="checkbox" id={id} className='hidden' onChange={handleOnChange} value={+checked} />
    <motion.label htmlFor={id}
      className='border-[10px] border-solid p-5 rounded-full text-center
        text-4xl font-black relative block w-full cursor-pointer select-none'
      style={{
        borderColor: color
      }}
      whileHover={!checked ? {
        borderColor: 'hsl(' + (convert.hex.hsl(children[3])[0])
          + ', ' + (convert.hex.hsl(children[3])[1] / 1.2)
          + ', ' + (convert.hex.hsl(children[3])[2] * 1.2) + ')'
      } : {}}
      transition={{
        ease: 'easeInOut',
        duration: .2
      }}
    >
      <div>{ children[0] }</div>
      <div className='absolute left-0 top-0 w-full h-full rounded-full
        z-[-1] backdrop-blur-md brightness-200'
      />
      <motion.div className='absolute text-center grid place-content-center text-black
        bg-white top-1 left-1 h-[72px] rounded-full'
        animate={checked ? {
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
    </motion.label>
  </div>)
}
export default ToggleSwitch
