import ToggleSwitch from "@/components/app/index/ToggleSwitch"
import { useOnIpc } from "@/hooks/useOnIpc"
import { ReactNode, useState } from "react"

interface ServerToggleSwitchProps {
  children: [ReactNode, ReactNode, ReactNode, string]
  udpPath: string
  className?: string
}

const ServerToggleSwitch = ({ children, udpPath, className }: ServerToggleSwitchProps) => {
  const [val, setVal] = useState<boolean>(false)

  useOnIpc(udpPath, (_, data) => setVal(!!data))
  
  const callback = (setNew: boolean) => {
    window.ipcRenderer.send('udp', {path: udpPath, msg: {set: +setNew}})
    return val
  }

  return <ToggleSwitch serverCallback={callback} className={className}>{ children }</ToggleSwitch>
}
export default ServerToggleSwitch
