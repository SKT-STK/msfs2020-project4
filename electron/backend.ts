import path from 'path'
import { execFile as child } from 'child_process'
import { getMainWin } from './globals'
import { app } from 'electron'

const appPacked = app.isPackaged

const execPath = path.join(path.dirname(process.execPath), 'core.exe')
export const port = appPacked ? ((Math.random() * (60_000 - 20_000 + 1)) | 0) + 20_000 : 55411
const args = [port.toString(), (port + 10).toString(), process.env.__SETTINGS]
appPacked && child(execPath, args, () => {
  getMainWin()!.webContents.on('did-finish-load', () => getMainWin()!.webContents.send('ERR'))
})
