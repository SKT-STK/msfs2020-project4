import { ReactNode } from "react"
import ToggleSwitch from "@/components/app/index/ToggleSwitch"
import { ipcRenderer } from "electron"

interface ClientToggleSwitchProps {
  children: [ReactNode, ReactNode, ReactNode, string]
  tcpPath: string
  className?: string
}

const ClientToggleSwitch = ({ children, tcpPath, className }: ClientToggleSwitchProps) => <ToggleSwitch
  clientCallback={value => ipcRenderer.send('tcp', {path: tcpPath, val: +value})}
  className={className}
>
  { children }
</ToggleSwitch>
export default ClientToggleSwitch
