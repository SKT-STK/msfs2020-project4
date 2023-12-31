import { useInterval } from "@/hooks/useInterval"
import { useOnIpc } from "@/hooks/useOnIpc"
import { ipcRenderer } from "electron"
import { useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Routes() {
  const mainWindowUrl = useRef<string>('/')
  const navigate = useNavigate()
	const location = useLocation()

	useInterval(() => {
		ipcRenderer.send('udp', { path: '/msfs-status', msg: {} })

    if (location.pathname !== '/yoke-calib-win') {
      ipcRenderer.send('set-main-window-browser-url', location.pathname)
    }
    else {
      if (mainWindowUrl.current !== '/settings/yoke') {
        ipcRenderer.send('destroy-yoke-window')
      }
    }
	}, 1000, true)

  useOnIpc('get-main-window-browser-url', (_, data) => {
    mainWindowUrl.current = data as string
  })
  
  useOnIpc('create-yoke-calib-page', () => {
    navigate('/yoke-calib-win')
  })

	useOnIpc('/msfs-status', (_, data) => {
		if (!data && location.pathname !== '/msfs-closed') {
			navigate('/msfs-closed')
		}
    else if (!!data && location.pathname === '/msfs-closed') {
			navigate('/')
		}
  })

	return <></>
}
