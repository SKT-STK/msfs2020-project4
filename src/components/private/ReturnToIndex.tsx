import SVG from '@/components/global/SVG'
import svgImg from '@/assets/leftArrow.svg'
import { Link } from 'react-router-dom'

const ReturnToIndex = () => {
  return (
    <div className='relative w-full h-[75px] border-b-4'>
      <Link to='/' className='fixed left-0 top-0 border-[20px]
        border-white rounded-[70px] cursor-pointer hover:border-[#FF5]
        ml-8 mt-9 scale-[.25] -translate-x-1/2 -translate-y-1/2'
      >
        <SVG src={svgImg} color={hover => hover ? '#FF5' : 'white'} />
      </Link>
      <h1 className='absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-[66%] text-4xl'>SETTINGS</h1>
    </div>
  )
}
export default ReturnToIndex
