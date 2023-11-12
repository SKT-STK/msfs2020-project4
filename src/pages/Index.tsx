import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Controls from "@/pages/Controls"
// import MsfsClosed from "@/pages/MsfsClosed"
// import _Temp from '@/pages/_temp'

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
	// return <_Temp />
}
export default Index
