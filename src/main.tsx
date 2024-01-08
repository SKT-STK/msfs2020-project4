import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/styles/index.scss'
import '@/styles/tailwind.scss'
import { HashRouter as Router } from "react-router-dom"
import Routes from '@/components/routes/Routes.tsx'
import { ipcRenderer } from 'electron'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
			<Routes />
			<App />
		</Router>
  </React.StrictMode>
)

ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
  ipcRenderer.send('START-CORE')
})
