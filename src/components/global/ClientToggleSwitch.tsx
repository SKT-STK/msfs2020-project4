import { ReactNode } from "react"
import ToggleSwitch from "@/components/global/private/ToggleSwitch"

interface ClientToggleSwitchProps {
  children: [ReactNode, ReactNode, ReactNode, string]
  tcpPath: string
  className?: string
}

const ClientToggleSwitch = ({ children, tcpPath, className }: ClientToggleSwitchProps) => <ToggleSwitch
    clientCallback={value => window.ipcRenderer.send('tcp', {path: tcpPath, val: +!value})}
    className={className}
  >
    { children }
  </ToggleSwitch>
export default ClientToggleSwitch
