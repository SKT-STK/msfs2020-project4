import { useInterval } from "@/hooks/useInterval"
import { useOnIpc } from "@/hooks/useOnIpc"
import { ipcRenderer } from "electron"
import { useState } from "react"

const N1Display = () => {
  const [n1, setN1] = useState<number>(0)

  useInterval(() => {
    ipcRenderer.send('udp', {path: '/controller-n1', msg: {}})
  }, 100)
  
  useOnIpc('/controller-n1', (_, args) => {
    const data = args as number
    setN1(data)
  })

  return (
    <div className='flex-1 h-full flex justify-center items-center w-full text-center
      flex-col'
    >
      <h1 className='text-6xl'>{ n1 }%</h1>
    </div>
  )
}
export default N1Display
