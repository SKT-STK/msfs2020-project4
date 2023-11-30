import { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'

interface SettingsEntryProps {
  url: string
  children: ReactNode
}

const ActionColor = '#FF5F15'

const SettingsEntry = ({ url, children }: SettingsEntryProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <motion.div
      className='h-[80px] border-2 border-slate-700 flex rounded-2xl
        justify-center items-center text-center text-2xl cursor-pointer
        mx-2 mb-[0px]'
      style={location.pathname.includes(url) ? {
        backgroundColor: ActionColor,
        color: 'black'
      } : {}}
      onClick={() => navigate('/settings' + url)}
      whileHover={{
        borderColor: ActionColor
      }}
    >
      { children }
    </motion.div>
  )
}
export default SettingsEntry
