import { BrowserWindow, IpcMainEvent } from "electron"
import path from 'path'
import { getMainWin, getYokeCalibWin, setYokeCalibWin } from './globals'

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

export const createYokeWin = () => {
  setYokeCalibWin(new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    title: 'Yoke Calibration',
    width: 680,
    height: 485,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
    },
  }))

  getYokeCalibWin()!.menuBarVisible = false
  getYokeCalibWin()!.resizable = false
  getYokeCalibWin()!.maximizable = false

  if (VITE_DEV_SERVER_URL) {
    getYokeCalibWin()!.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    getYokeCalibWin()!.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  getYokeCalibWin()!.webContents.on('did-finish-load', () => {
    getYokeCalibWin()?.webContents.send('load-yoke-calib-page')
    getYokeCalibWin()?.show()
  })
}

export const closeYokeWin = (_: IpcMainEvent, rot: unknown) => {
  getMainWin()?.webContents.send('did-close-yoke-calib-win', rot)
  getYokeCalibWin()?.close()
  setYokeCalibWin(null)
}

export const destroyYokeWin = () => {
  getYokeCalibWin()?.close()
  setYokeCalibWin(null)
}
