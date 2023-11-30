import Index from "@/pages/Index"
import BackendCppErr from "@/pages/BackendCppErr"
import MsfsClosed from "@/pages/MsfsClosed"
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import TransitionLayout from "@/layouts/PageTransitionLayout"
import SettingsPhone from "@/pages/SettingsPhone"
import SettingsLayout from "@/layouts/SettingsLayout"
import SettingsYoke from "@/pages/SettingsYoke"

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
				<Route path='/settings/phone' element={
					<SettingsLayout>
						<SettingsPhone />
					</SettingsLayout>
				} />
				<Route path='/settings/yoke' element={
					<SettingsLayout>
						<SettingsYoke />
					</SettingsLayout>
				} />
				<Route path='/msfs-closed' element={
					<TransitionLayout>
						<MsfsClosed />
					</TransitionLayout>
				} />
				<Route path='/backend-cpp-err' element={
					<TransitionLayout>
						<BackendCppErr />
					</TransitionLayout>
				} />
			</Routes>
		</AnimatePresence>
	)
}
