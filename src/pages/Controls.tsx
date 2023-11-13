import N1Limiter from '@/components/N1Limiter'
import PlaneModel from '@/components/PlaneModel'
import ToggleSwitches from '@/components/ToggleSwitches'
import TopographicBackground from '@/components/TopographicBackground'

const Index = () => {
  return (<>
    <TopographicBackground steps={100} startHue={320} endHue={230} />
		<main className='flex justify-center items-center min-h-screen w-full flex-row'>
			<ToggleSwitches />
			<div className='flex justify-center items-center h-screen w-full flex-col flex-[3] backdrop-blur-md backdrop-brightness-200'>
				<PlaneModel />
				<N1Limiter />
			</div>
		</main>
  </>)
}
export default Index
