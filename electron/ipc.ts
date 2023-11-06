import { ipcMain, BrowserWindow } from 'electron'
import { udpReceive, udpSend } from './udp'

ipcMain.on('udp', (_, data: UdpMsg, times: number = 1) => udpSend(data, times))

udpReceive('/yoke', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/yoke', res))
udpReceive('/thrust', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/thrust', res))
udpReceive('/reverses', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/reverses', res))
