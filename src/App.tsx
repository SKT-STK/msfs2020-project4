import Index from "@/pages/Index"
import BackendCppErr from "@/pages/BackendCppErr"
import MsfsClosed from "@/pages/MsfsClosed"
import Settings from "@/pages/Settings"
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Transition from "@/layouts/Transition"

export default function App() {
	const location = useLocation()

	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={
					<Transition>
						<Index />
					</Transition>
				} />
				<Route path='/settings' element={
					<Transition>
						<Settings />
					</Transition>
				} />
				<Route path='/msfs-closed' element={
					<Transition>
						<MsfsClosed />
					</Transition>
				} />
				<Route path='/backend-cpp-err' element={
					<Transition>
						<BackendCppErr />
					</Transition>
				} />
			</Routes>
		</AnimatePresence>
	)
}
