import { BrowserWindow } from "electron"
import path from 'path'
import { getMainWin } from './shared'

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

let win: BrowserWindow | null = null

export const createYokeWin = () => {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    title: 'Yoke Calibration',
    width: 680,
    height: 485,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
    },
  })

  win.menuBarVisible = false
  win.resizable = false
  win.maximizable = false

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('load-yoke-calib-page')
    win?.show()
  })
}

export const closeYokeWin = (_: Electron.IpcMainEvent, rot: unknown) => {
  getMainWin()?.webContents.send('did-close-yoke-calib-win', rot)
  win?.close()
  win = null
}

export const destroyYokeWin = () => {
  win?.close()
  win = null
}
