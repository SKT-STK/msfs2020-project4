import { SettingsState, useSettingsStore } from "@/data/useSettingsStore"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const IncompleteSettings = () => {
  const settingsObj = useRef<SettingsState['settings']>(useSettingsStore().settings)
  const navigate = useNavigate()

  useEffect(() => {
    window.ipcRenderer.invoke('read-settings')
      .then(data => JSON.parse(data as string))
      .then(v => {
        for (const key in settingsObj.current) {
          !(key in v) && navigate('/settings-error')
        }
      })
  }, [])

  return <></>
}
export default IncompleteSettings
