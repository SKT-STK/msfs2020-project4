import path from 'path'
import { BrowserWindow } from 'electron'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const child = require('child_process').execFile
const execName = 'cpp.exe'
const execPath = process.env.NODE_ENV?.trim() === 'dev' ?
  path.join("C:\\Users\\kwasn\\Desktop\\github\\msfs2020-project4\\cpp\\x64_Debug", execName)
  : path.join(path.dirname(process.execPath), execName)
export const port = ((Math.random() * (60_000 - 20_000 + 1)) | 0) + 20_000
const args = [port.toString()]
child(execPath, args, () => { 
  const mainWin = BrowserWindow.getAllWindows()[0]
  mainWin.webContents.on('did-finish-load', () => mainWin.webContents.send('ERR'))
})
