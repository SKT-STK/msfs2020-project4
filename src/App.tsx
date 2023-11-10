import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Index from "@/pages/Index"
import BackendCppErr from "./pages/BackendCppErr"
import MsfsClosed from "@/pages/MsfsClosed"
import Controls from '@/pages/Controls'

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" Component={Index} />
				<Route path='/controls' Component={Controls} />
				<Route path='/msfs-closed' Component={MsfsClosed} />
				<Route path='/backend-cpp-err' Component={BackendCppErr} />
			</Routes>
		</Router>
	)
}
