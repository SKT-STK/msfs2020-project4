import { BrowserWindow, IpcMainEvent } from "electron"
import path from 'path'
import { getMainWin, getYokeCalibWin, setYokeCalibWin } from './globals'

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

  if (process.env.VITE_DEV_SERVER_URL) {
    getYokeCalibWin()!.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    getYokeCalibWin()!.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  getYokeCalibWin()!.webContents.on('did-finish-load', () => {
    getYokeCalibWin()!.webContents.send('create-yoke-calib-page')
  })

  getYokeCalibWin()!.on('close', () => {
    setYokeCalibWin(null)
  })
}

export const displayYokeWin = () => {
  getYokeCalibWin()?.show()
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
