import Index from "@/pages/Index"
import MsfsClosed from "@/pages/MsfsClosed"
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import TransitionLayout from "@/layouts/PageTransitionLayout"
import SettingsPhone from "@/pages/settings/SettingsPhone"
import SettingsLayout from "@/layouts/SettingsLayout"
import SettingsYoke from "@/pages/settings/SettingsYoke"
import SettingsThrottles from "@/pages/settings/SettingsThrottles"
import SettingsReverses from "@/pages/settings/SettingsReverses"
import SettingsError from "@/pages/SettingsError"
import YokeCalibWin from "@/windows/yokeCalibWin/YokeCalibWin"

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
				<Route path='/settings/throttles' element={
					<SettingsLayout>
						<SettingsThrottles />
					</SettingsLayout>
				} />
				<Route path='/settings/reverses' element={
					<SettingsLayout>
						<SettingsReverses />
					</SettingsLayout>
				} />
				<Route path='/settings-error' element={
					<TransitionLayout>
						<SettingsError />
					</TransitionLayout>
				} />
				<Route path='/msfs-closed' element={
					<TransitionLayout>
						<MsfsClosed />
					</TransitionLayout>
				} />
        <Route path='/yoke-calib-win' element={
					<YokeCalibWin />
        } />
			</Routes>
		</AnimatePresence>
	)
}
