import IncompleteSettings from '@/helpers/IncompleteSettings'
import N1Display from '@/components/app/index/N1Display'
import PlaneModel from '@/components/app/index/PlaneModel'
import SettingsIcon from '@/components/app/index/SettingsIcon'
import ToggleSwitches from '@/components/app/index/ToggleSwitches'
import TopographicBackground from '@/components/global/TopographicBackground'

const Index = () => {
  return (<>
    <TopographicBackground steps={100} startHue={320} endHue={230} />
		<SettingsIcon />
		<IncompleteSettings />
		<main className='flex justify-center items-center min-h-screen w-full flex-row'>
			<ToggleSwitches />
			<div className='flex justify-center items-center h-screen w-full flex-col flex-[3] backdrop-blur-md backdrop-brightness-200'>
				<PlaneModel />
				<N1Display />
			</div>
		</main>
  </>)
}
export default Index
