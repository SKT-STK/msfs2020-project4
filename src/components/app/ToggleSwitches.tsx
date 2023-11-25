import ClientToggleSwitch from '@/components/global/ClientToggleSwitch'
import ServerToggleSwitch from '@/components/global/ServerToggleSwitch'

const ToggleSwitches = () => {
  return (
    <section className='flex justify-center items-center min-h-screen w-full
			flex-col flex-[5] border-r-4'
    >    
      <ClientToggleSwitch tcpPath='/yoke' className='my-5'>{[ 'YOKE', '✈️', '🛩️', '#F55' ]}</ClientToggleSwitch>
      <ClientToggleSwitch tcpPath='/thrust' className='my-5'>{[ 'THROTTLE', '🚀', '🚀', '#F55' ]}</ClientToggleSwitch>
      <ServerToggleSwitch udpPath='/reverses' className='my-5'>{[ 'REVERSES', '🛫', '🛬', '#F55' ]}</ServerToggleSwitch>
    </section>
  )
}
export default ToggleSwitches
