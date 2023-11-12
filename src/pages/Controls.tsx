import ClientToggleSwitch from '@/components/ClientToggleSwitch'
import ServerToggleSwitch from '@/components/ServerToggleSwitch'
import TopographicBackground from '@/components/TopographicBackground'

const Index = () => {
  return (<>
    <TopographicBackground steps={100} startHue={320} endHue={230} />
		<main className='flex justify-center items-center min-h-screen w-full flex-row'>
			<section className='flex justify-center items-center min-h-screen w-full
				flex-col flex-[5] border-r-4 border-[#767C]'>
				<ClientToggleSwitch tcpPath='/yoke' className='my-5'>{[ 'YOKE', '✈️', '🛩️', '#F55' ]}</ClientToggleSwitch>
				<ClientToggleSwitch tcpPath='/thrust' className='my-5'>{[ 'THROTTLE', '🚀', '🚀', '#F55' ]}</ClientToggleSwitch>
        <ServerToggleSwitch udpPath='/reverses' className='my-5'>{[ 'REVERSES', '🛫', '🛬', '#F55' ]}</ServerToggleSwitch>
			</section>
			<section className='flex justify-center items-center min-h-screen w-full flex-col flex-[2] backdrop-blur-md brightness-200'>
				
			</section>
		</main>
  </>)
}
export default Index
