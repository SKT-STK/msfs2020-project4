import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react-refresh/only-export-components
export default function () {
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
