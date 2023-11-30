import N1Limiter from '@/components/app/index/N1Limiter'
import PlaneModel from '@/components/app/index/PlaneModel'
import SettingsIcon from '@/components/global/SettingsIcon'
import ToggleSwitches from '@/components/app/index/ToggleSwitches'
import TopographicBackground from '@/components/global/TopographicBackground'
import { useInterval } from '@/hooks/useInterval'

const Index = () => {
	useInterval(() => {
		window.ipcRenderer.send('udp', {path: '/msfs-status', msg: {}})
	}, 500, true)

  return (<>
    <TopographicBackground steps={100} startHue={320} endHue={230} />
		<SettingsIcon />
		<main className='flex justify-center items-center min-h-screen w-full flex-row'>
			<ToggleSwitches />
			<div className='flex justify-center items-center h-screen w-full flex-col flex-[3] backdrop-blur-md backdrop-brightness-200'>
				<PlaneModel />
				<N1Limiter color='#FFFF55' />
			</div>
		</main>
  </>)
}
export default Index
