import NavBar from "@/components/app/settings/NavBar"
import TitleBar from "@/components/app/settings/TitleBar"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import SettingsAnimationDivs from "@/components/app/settings/SettingsAnimationDivs"
import WrongSettingsPopup from "@/components/app/settings/WrongSettingsPopup"
import { SettingsState, useSettingsStore } from "@/data/useSettingsStore"

interface SettingsLayoutProps {
  children: ReactNode
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const settingsSetter = useCallback<SettingsState['setSettings']>(useSettingsStore().setSettings, [])
  const settingsObj = useRef<SettingsState['settings']>(useSettingsStore().settings)

  useEffect(() => {
    window.ipcRenderer.invoke('read-settings')
      .then(data => JSON.parse(data as string))
      .then(v => {
        let obj = {...v}
        for (let key in obj) {
          !(key in settingsObj.current) && delete obj[key as keyof SettingsState['settings']]
        }
        for (let key in settingsObj.current) {
          !(key in obj) && (obj[key as keyof SettingsState['settings']] = null)
        }
        settingsSetter(obj as SettingsState['settings'])
      })
  }, [])

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
