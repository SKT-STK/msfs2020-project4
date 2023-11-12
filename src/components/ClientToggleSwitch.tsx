import { ReactNode } from "react"
import ToggleSwitch from "./ToggleSwitch"

interface ClientToggleSwitchProps {
  children: [ReactNode, ReactNode, ReactNode, string]
  tcpPath: string
  className?: string
}

const ClientToggleSwitch = ({ children, tcpPath, className }: ClientToggleSwitchProps) => <ToggleSwitch
    clientCallback={v => window.ipcRenderer.send('tcp', {path: tcpPath, val: v === 0 ? 1 : 0})}
    className={className}
  >
    { children }
  </ToggleSwitch>
export default ClientToggleSwitch
