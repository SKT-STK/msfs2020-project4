import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from 'framer-motion'

interface SettingsEntryProps {
  url: string
  children: ReactNode
}

const ActionColor = '#FF5F15'

const SettingsEntry = ({ url, children }: SettingsEntryProps) => {
  const location = useLocation()

  return (
    <Link to={'/settings' + url}>
      <motion.div
        className='h-[80px] border-2 border-slate-700 flex rounded-2xl
          justify-center items-center text-center text-2xl cursor-pointer
          mx-2 mb-[0px]'
        style={location.pathname.includes(url) ? {
          backgroundColor: ActionColor,
          color: '#0E1414'
        } : {}}
        whileHover={{
          borderColor: ActionColor
        }}
      >
        { children }
      </motion.div>
    </Link>
  )
}
export default SettingsEntry
