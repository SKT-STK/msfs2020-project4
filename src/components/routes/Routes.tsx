import { useInterval } from "@/hooks/useInterval"
import { useOnIpc } from "@/hooks/useOnIpc"
import { useNavigate, useLocation } from "react-router-dom"

export default function Routes() {
  const navigate = useNavigate()
	const location = useLocation()

	useInterval(() => {
		window.ipcRenderer.send('udp', { path: '/msfs-status', msg: {} })
	}, 1000, true)

	useOnIpc('ERR', () => navigate('/backend-cpp-err'))

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
