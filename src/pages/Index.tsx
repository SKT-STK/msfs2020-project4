import svg from '@/assets/react.svg'
import SVG from '@/components/SVG'
import { Link } from 'react-router-dom'

const Index = () => {
    return (<>
        <Link to='/controls'>
            <SVG src={svg} color='#FF5' />
        </Link>
    </>)
}
export default Index
