import { useEffect } from "react"

export const useOnIpc = (path: string, listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void) => {
  useEffect(() => {
    window.ipcRenderer.on(path, (e, a) => listener(e, a))
    return () => {
      window.ipcRenderer.removeAllListeners(path)
    }
  }, [path, listener])
}
