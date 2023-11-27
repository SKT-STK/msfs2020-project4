import { ipcMain, BrowserWindow, app } from 'electron'
import net from 'net'
import dgram from 'dgram'
// import * as backend from './backend'

const tcp = {
  // port: backend.port,
  port: 55411,
  addr: '127.0.0.1'
}
const udp = {
  // port: backend.port + 1,
  port: 2642,
  addr: '127.0.0.1'
}

const bufferToMsgObj = (data: Buffer, func: ({ msg }: { msg: { path: string, msg: any } }) => void) => func(JSON.parse(data.toString()))

const tcpClient = new net.Socket()
const tcpSend = (msg: string) => tcpClient.connect(tcp.port, tcp.addr, () => tcpClient.write(msg, () => tcpClient.end()))

const udpClient = dgram.createSocket('udp4')
const udpSend = (msg: string) => udpClient.send(msg, udp.port, udp.addr)

const paths: Map<string, (_: any) => void> = new Map()
const udpReceive = (path: string, func: (_: any) => void) => paths.set(path, func)
udpClient.on('message', data => bufferToMsgObj(data, ({msg}) => paths.forEach((v, k) => {if (msg.path === k) v(msg.msg)})))


ipcMain.on('tcp', (_, data: object) => tcpSend(JSON.stringify(data)))
ipcMain.on('udp', (_, data: object) => udpSend(JSON.stringify(data)))
ipcMain.on('EXIT', app.quit)

udpReceive('/reverses', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/reverses', res))
udpReceive('/plane-model', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/plane-model', res))
udpReceive('/msfs-status', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/msfs-status', res))
