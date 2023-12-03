import ClientToggleSwitch from '@/components/app/index/ClientToggleSwitch'
import ServerToggleSwitch from '@/components/app/index/ServerToggleSwitch'

const ToggleSwitches = () => {
  return (
    <section className='flex justify-center items-center min-h-screen w-full
			flex-col flex-[5] border-r-4'
    >    
      <ClientToggleSwitch tcpPath='/yoke' className='my-5'>{[ 'YOKE', '✈️', '🛩️', '#77FF77' ]}</ClientToggleSwitch>
      <ClientToggleSwitch tcpPath='/thrust' className='my-5'>{[ 'THROTTLE', '🚀', '🚀', '#45CFDD' ]}</ClientToggleSwitch>
      <ServerToggleSwitch udpPath='/reverses' className='my-5'>{[ 'REVERSES', '🛫', '🛬', '#FF5555' ]}</ServerToggleSwitch>
    </section>
  )
}
export default ToggleSwitches
