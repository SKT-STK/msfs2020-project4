import svgImg from '@/assets/leftArrow.svg'
import SVG from "@/components/global/SVG"

interface TitleBarProps {
  onPageChange: () => void
}

const TitleBar = ({ onPageChange }: TitleBarProps) => {
  return (
    <div className='relative w-full h-[11vh] bg-[#0E1414]'>
      <div onClick={onPageChange} className='fixed left-0 top-0 cursor-pointer ml-8
        mt-[27.5px] scale-[.07] -translate-x-1/2 -translate-y-1/2'
      >
        <SVG src={svgImg} color={hover => hover ? '#FF5F15' : 'white'} />
      </div>
      <h1 className='absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 text-4xl'>SETTINGS</h1>
    </div>
  )
}
export default TitleBar
