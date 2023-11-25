import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Routes() {
  const navigate = useNavigate()

	useEffect(() => {
		window.ipcRenderer.on('ERR', () => {
			navigate('/backend-cpp-err')
		})
		return () => {
			window.ipcRenderer.removeAllListeners('ERR')
		}
	}, [navigate])

	return <></>
}
