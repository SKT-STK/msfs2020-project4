import { ipcRenderer } from "electron"
import { useEffect } from "react"

export const useOnIpc = (path: string, listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void) => {
  useEffect(() => {
    ipcRenderer.on(path, (e, a) => listener(e, a))
    return () => {
      ipcRenderer.removeAllListeners(path)
    }
  }, [path, listener])
}
