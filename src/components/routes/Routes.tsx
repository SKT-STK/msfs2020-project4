import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Routes() {
  const navigate = useNavigate()

	useEffect(() => {
		window.ipcRenderer.on('ERR', () => {
			navigate('/backend-cpp-err')
		})
		window.ipcRenderer.on('/msfs-status', (_, data: { status: boolean }) => {
			if (!data.status) navigate('/msfs-closed')
			else navigate('/')
		})

		return () => {
			window.ipcRenderer.removeAllListeners('ERR')
			window.ipcRenderer.removeAllListeners('/msfs-status')
		}
	}, [navigate])

	return <></>
}
