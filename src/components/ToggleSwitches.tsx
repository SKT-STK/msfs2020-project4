import ClientToggleSwitch from '@/components/ClientToggleSwitch'
import ServerToggleSwitch from '@/components/ServerToggleSwitch'

const ToggleSwitches = () => {
  return (
    <section className='flex justify-center items-center min-h-screen w-full
			flex-col flex-[5] border-r-4 border-[#767C]'
    >    
      <ClientToggleSwitch tcpPath='/yoke' className='my-5'>{[ 'YOKE', '✈️', '🛩️', '#F55' ]}</ClientToggleSwitch>
      <ClientToggleSwitch tcpPath='/thrust' className='my-5'>{[ 'THROTTLE', '🚀', '🚀', '#F55' ]}</ClientToggleSwitch>
      <ServerToggleSwitch udpPath='/reverses' className='my-5'>{[ 'REVERSES', '🛫', '🛬', '#F55' ]}</ServerToggleSwitch>
    </section>
  )
}
export default ToggleSwitches
