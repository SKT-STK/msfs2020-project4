import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Routes() {
  const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		window.ipcRenderer.on('ERR', () => {
			navigate('/backend-cpp-err')
		})
		window.ipcRenderer.on('/msfs-status', (_, data) => {
			if (!data && location.pathname !== '/msfs-closed') navigate('/msfs-closed')
			else if (!!data && location.pathname === '/msfs-closed') navigate('/')
		})

		return () => {
			window.ipcRenderer.removeAllListeners('ERR')
			window.ipcRenderer.removeAllListeners('/msfs-status')
		}
	}, [navigate, location])

	return <></>
}
