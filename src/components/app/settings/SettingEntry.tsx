import { ReactNode } from "react"

interface SettingEntryProps {
  text: string
  children: ReactNode
}

const SettingEntry = ({ text, children }: SettingEntryProps) => {
  return (
    <div className='w-full h-[10%] flex items-center justify-between border-b-slate-700 [&:not(:last-child)]:border-b-[1px]'>
      <h1 className='text-xl'>{ text }</h1>
      { children }
    </div>
  )
}
export default SettingEntry
