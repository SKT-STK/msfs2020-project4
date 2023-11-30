import NavBar from "@/components/app/settings/NavBar"
import TitleBar from "@/components/app/settings/TitleBar"
import { ReactNode, useState } from "react"
import SettingsAnimationDivs from "@/components/app/settings/SettingsAnimationDivs"

interface SettingsLayoutProps {
  children: ReactNode
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const [startOutAnim, setStartOutAnim] = useState<boolean>(false)

  return (<>
    <SettingsAnimationDivs controlsOutStart={startOutAnim} />
    <TitleBar onPageChange={() => setStartOutAnim(true)} />
    <main className='min-h-screen w-full grid grid-cols-7 grid-rows-1
      gap-0 border-t-2 border-t-slate-700'>
      <NavBar />
      <section className='col-start-3 col-end-8 row-start-1
        row-end-1 bg-[#171E1E] p-3'>
        { children }
      </section>
    </main>
  </>)
}
export default SettingsLayout
