import Index from "@/pages/Index"
import BackendCppErr from "@/pages/BackendCppErr"
import MsfsClosed from "@/pages/MsfsClosed"
import Settings from "@/pages/Settings"
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import TransitionLayout from "@/layouts/PageTransitionLayout"

export default function App() {
	const location = useLocation()

	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={
					<TransitionLayout>
						<Index />
					</TransitionLayout>
				} />
				<Route path='/settings' element={
					<TransitionLayout>
						<Settings />
					</TransitionLayout>
				} />
				<Route path='/msfs-closed' element={
					<MsfsClosed />
				} />
				<Route path='/backend-cpp-err' element={
					<BackendCppErr />
				} />
			</Routes>
		</AnimatePresence>
	)
}
