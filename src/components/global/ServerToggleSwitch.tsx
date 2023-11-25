import ToggleSwitch from "@/components/global/private/ToggleSwitch"
import { ReactNode, useEffect, useState } from "react"

interface ServerToggleSwitchProps {
  children: [ReactNode, ReactNode, ReactNode, string]
  udpPath: string
  className?: string
}

const ServerToggleSwitch = ({ children, udpPath, className }: ServerToggleSwitchProps) => {
  const [val, setVal] = useState<CBOOL>(0)

  useEffect(() => {
    window.ipcRenderer.on(udpPath, (_, data) => {
      setVal(data)
    })
    return () => {
      window.ipcRenderer.removeAllListeners(udpPath)
    }
  }, [udpPath])
  
  const callback = (setNew: CBOOL) => {
    window.ipcRenderer.send('udp', {path: udpPath, msg: {set: setNew}})
    return val
  }

  return <ToggleSwitch serverCallback={callback} className={className}>{ children }</ToggleSwitch>
}
export default ServerToggleSwitch
