import NavBar from "@/components/app/settings/NavBar"
import TitleBar from "@/components/app/settings/TitleBar"
import { ReactNode, useEffect, useRef } from "react"
import SettingsAnimationDivs from "@/components/app/settings/SettingsAnimationDivs"
import WrongSettingsPopup from "@/components/app/settings/WrongSettingsPopup"
import { SettingsState, useSettingsStore } from "@/data/useSettingsStore"

interface SettingsLayoutProps {
  children: ReactNode
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const settingsSetter = useRef<SettingsState['setSettings']>(useSettingsStore().setSettings)
  const settingsObj = useRef<SettingsState['settings']>(useSettingsStore().settings)

  useEffect(() => {
    window.ipcRenderer.invoke('read-settings')
      .then(data => JSON.parse(data as string))
      .then(v => {
        const obj = {...v}
        for (const key in settingsObj.current) {
          !(key in obj) && (obj[key as keyof SettingsState['settings']] = null)
        }
        settingsSetter.current(obj as SettingsState['settings'])
      })
  }, [])

  return (<>
    <SettingsAnimationDivs />
    <WrongSettingsPopup />
    <TitleBar />
    <main className='min-h-screen w-full grid grid-cols-7 grid-rows-1
      gap-0 border-t-2 border-t-slate-700'
    >
      <NavBar />
      <section className='col-start-3 col-end-8 row-start-1
        row-end-1 bg-[#1A1A1A] pt-3 px-6 flex flex-col w-full h-full'
      >
        { children }
      </section>
    </main>
  </>)
}
export default SettingsLayout
