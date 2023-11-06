import ToggleSwitch from "@/components/ToggleSwitch"
import { ReactNode, useEffect, useState } from "react"

interface ServerToggleSwitchProps {
  children: [ReactNode, ReactNode, ReactNode]
  udpPath: string
  className?: string
}

const ServerToggleSwitch = ({ children, udpPath, className }: ServerToggleSwitchProps) => {
  const [val, setVal] = useState<BOOL>(0)

  useEffect(() => {
    window.ipcRenderer.on(udpPath, (_, data) => {
      setVal(data)
    })
  }, [udpPath])
  
  const callback = (_: BOOL, setNew: BOOL) => {
    window.ipcRenderer.send('udp', {path: udpPath, msg: {set: setNew}})
    return val
  }

  return <ToggleSwitch callback={callback} className={className}>{ children }</ToggleSwitch>
}
export default ServerToggleSwitch
