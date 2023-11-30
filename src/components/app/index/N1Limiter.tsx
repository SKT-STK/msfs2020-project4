import { motion } from 'framer-motion'
import * as convert from 'color-convert'
import { useState } from 'react'

interface N1limiterProps {
  color: string
}

const N1Limiter = ({ color }: N1limiterProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <div className='flex-1 h-full flex justify-center items-center w-full text-center
      flex-col'>
      <h1 className='mb-[30px] text-5xl'>N1 Limit</h1>
      <motion.input type="number"
        className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none text-center focus:outline-0
          bg-transparent w-[200px] border-x-transparent border-t-transparent border-b-[#FFF]
          border-8 text-[50px] rounded-[50px]'
        whileFocus={{
          borderBottomColor: color
        }}
        whileHover={!isFocused ? {
        borderBottomColor: 'hsl(' + (convert.hex.hsl(color)[0])
          + ', ' + (convert.hex.hsl(color)[1] / 1.2)
          + ', ' + (convert.hex.hsl(color)[2] * 1.2) + ')'
        } : {}}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        transition={{
          ease: 'easeInOut',
          duration: .2
        }}
        onChange={e => window.ipcRenderer.send('tcp',
          {path: '/max-n1', val: Number(e.target.value)})}
        defaultValue={101}
      />
    </div>
  )
}
export default N1Limiter
