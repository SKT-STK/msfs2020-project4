import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Controls from "@/pages/Controls"
// import MsfsClosed from "./MsfsClosed"

const Index = () => {
	const navigate = useNavigate()

	useEffect(() => {
		window.ipcRenderer.on('ERR', () => {
			navigate('/backend-cpp-err')
		})
		return () => {
			window.ipcRenderer.removeAllListeners('ERR')
		}
	}, [navigate])

	return <Controls />
	// return <MsfsClosed />
}
export default Index
