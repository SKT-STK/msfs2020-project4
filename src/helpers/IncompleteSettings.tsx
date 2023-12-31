import { SettingsState, useSettingsStore } from "@/data/useSettingsStore"
import { ipcRenderer } from "electron"
import { useEffect, useRef } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

const IncompleteSettings = () => {
  const settingsObj = useRef<SettingsState['settings']>(useSettingsStore().settings)
  const navigate = useRef<NavigateFunction>(useNavigate())

  useEffect(() => {
    ipcRenderer.invoke('read-settings')
      .then(data => JSON.parse(data as string))
      .catch(() => navigate.current('/settings-error'))
      .then(v => {
        for (const key in settingsObj.current) {
          !(key in v) && navigate.current('/settings-error')
        }
      })
  }, [])

  return <></>
}
export default IncompleteSettings
