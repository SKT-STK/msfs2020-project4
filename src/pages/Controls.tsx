import N1Limiter from '@/components/N1Limiter'
import ToggleSwitches from '@/components/ToggleSwitches'
import TopographicBackground from '@/components/TopographicBackground'

const Index = () => {
  return (<>
    <TopographicBackground steps={100} startHue={320} endHue={230} />
		<main className='flex justify-center items-center min-h-screen w-full flex-row'>
			<ToggleSwitches />
			<N1Limiter />
		</main>
  </>)
}
export default Index
