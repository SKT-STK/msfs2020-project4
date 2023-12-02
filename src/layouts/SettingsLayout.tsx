import NavBar from "@/components/app/settings/NavBar"
import TitleBar from "@/components/app/settings/TitleBar"
import { ReactNode } from "react"
import SettingsAnimationDivs from "@/components/app/settings/SettingsAnimationDivs"
import WrongSettingsPopup from "@/components/app/settings/WrongSettingsPopup"

interface SettingsLayoutProps {
  children: ReactNode
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (<>
    <SettingsAnimationDivs />
    <WrongSettingsPopup />
    <TitleBar />
    <main className='min-h-screen w-full grid grid-cols-7 grid-rows-1
      gap-0 border-t-2 border-t-slate-700'>
      <NavBar />
      <section className='col-start-3 col-end-8 row-start-1
        row-end-1 bg-[#1A1A1A] pt-3 px-6 flex flex-row justify-between'>
        { children }
      </section>
    </main>
  </>)
}
export default SettingsLayout
