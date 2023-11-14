import { ipcMain, BrowserWindow, app } from 'electron'
import { udpReceive, udpSend } from './udp'
import { tcpSend } from './tcp'

ipcMain.on('udp', (_, data: object) => udpSend(JSON.stringify(data)))

let canSendTcp = true
ipcMain.on('tcp', (_, data: object) => {
  if (canSendTcp) {
    canSendTcp = false
    tcpSend(JSON.stringify(data), () => {
      canSendTcp = true
    })
  }
})

ipcMain.on('EXIT', app.quit)

udpReceive('/reverses', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/reverses', res))
udpReceive('/plane-model', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/plane-model', res))
