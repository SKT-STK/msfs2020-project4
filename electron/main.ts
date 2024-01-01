import { app, BrowserWindow, /* protocol */ } from 'electron'
import path from 'node:path'
import { setMainWin, getMainWin } from './shared'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')
process.env.__SETTINGS = path.join(process.env.VITE_PUBLIC, app.isPackaged ? '../../..' : '../other', 'resources/conf')

// let win: BrowserWindow | null = null

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  const splash = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    title: 'My DIY Controls',
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true
  })
  splash.loadFile(path.join(process.env.VITE_PUBLIC, 'splash.html'))
  splash.center()

  setMainWin(new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    title: 'My DIY Controls',
    width: 780,
    height: 585,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
    },
  }))

  getMainWin()!.menuBarVisible = false
  getMainWin()!.resizable = false
  getMainWin()!.maximizable = false

  // Test active push message to Renderer-process.
  getMainWin()!.webContents.on('did-finish-load', () => {
    getMainWin()!.webContents.send('main-process-message', (new Date).toLocaleString())
    getMainWin()!.show()
    splash.destroy()
  })

  if (VITE_DEV_SERVER_URL) {
    getMainWin()!.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    getMainWin()!.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  // Quit when main window is closed.
  getMainWin()!.on('closed', () => {
    app.quit()
    setMainWin(null)
  })
}

// Load main window and start rest of the JS backend.
app.whenReady()
  .then(createWindow)
  .then(() => import('./ipc'))
