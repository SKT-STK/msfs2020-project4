import path from 'path'
import { BrowserWindow } from 'electron'
import { execFile as child } from 'child_process'
import { app } from 'electron'

const execPath = path.join(path.dirname(process.execPath), 'backend_.exe')
export const port = app.isPackaged ? ((Math.random() * (60_000 - 20_000 + 1)) | 0) + 20_000 : 55411
const args = [port.toString(), (port + 10).toString(), process.env.__SETTINGS]
app.isPackaged && child(execPath, args, () => { 
  const mainWin = BrowserWindow.getAllWindows()[0]
  mainWin.webContents.on('did-finish-load', () => mainWin.webContents.send('ERR'))
})
