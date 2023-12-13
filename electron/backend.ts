import path from 'path'
import { BrowserWindow } from 'electron'
import { execFile as child } from 'child_process'
import { app } from 'electron'

const execPath = !app.isPackaged ?
  path.join("C:\\Users\\kwasn\\Desktop\\github\\msfs2020-project4\\cpp\\Win32", 'backend_.exe')
  : path.join(path.dirname(process.execPath), 'backend_.exe')
export const port = ((Math.random() * (60_000 - 20_000 + 1)) | 0) + 20_000
const args = [port.toString()]
child(execPath, args, () => { 
  const mainWin = BrowserWindow.getAllWindows()[0]
  mainWin.webContents.on('did-finish-load', () => mainWin.webContents.send('ERR'))
})
