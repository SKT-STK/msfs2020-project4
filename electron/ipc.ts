import { ipcMain, BrowserWindow, app } from 'electron'
import net from 'net'
import dgram from 'dgram'
import * as fs from 'node:fs'
import { writeHashedEasings } from './evalCompiler'
// import * as backend from './backend'

const tcp = {
  // port: backend.port,
  port: 55411,
  addr: '127.0.0.1'
}
const udp = {
  // port: backend.port + 10,
  port: 2642,
  addr: '127.0.0.1'
}

const paths: Map<string, (_: unknown) => void> = new Map()

const tcpClient = new net.Socket()
const udpClient = dgram.createSocket('udp4')

const bufferToMsgObj = (data: Buffer, func: ({ msg }: { msg: { path: string, msg: unknown } }) => void) => {
  func(JSON.parse(data.toString()))
}

const tcpSend = (msg: string) => {
  tcpClient.connect(tcp.port, tcp.addr, () => {
    tcpClient.write(msg, () => {
      tcpClient.end()
    })
  })
}

const udpSend = (msg: string) => {
  udpClient.send(msg, udp.port, udp.addr)
}

const udpReceive = (path: string, func: (_: unknown) => void) => {
  paths.set(path, func)
}

const writeEasings = (data: ({ yoke_Easing: string | null } | undefined) & ({ throttle_Easing: string | null } | undefined)) => {
  if (data && data.yoke_Easing) {
    if (writeHashedEasings(data.yoke_Easing, 'hashedYokeEasings.json') === 'error') {
      writeHashedEasings('x', 'hashedYokeEasings.json')
    }
  }
  if (data && data.throttle_Easing) {
    if (writeHashedEasings(data.throttle_Easing, 'hashedThrottleEasings.json') === 'error') {
      writeHashedEasings('x', 'hashedThrottleEasings.json')
    }
  }
}

const saveSettings = (_: Electron.IpcMainEvent, ...args: unknown[]) => {
  const data = (args as object[])[0]
  fs.writeFileSync(process.env.__RESOURCES + '/settings.json', JSON.stringify(data))
  writeEasings(data as ({ yoke_Easing: string | null } | undefined) & ({ throttle_Easing: string | null } | undefined))
  tcpSend(JSON.stringify({ path: '/user-settings', val: -1 }))
}


udpClient.on('message', data => {
  bufferToMsgObj(data, ({msg}) => {
    paths.forEach((v, k) => {
      msg.path === k && v(msg.msg)
    })
  })
})

ipcMain.on('tcp', (_, data: object) => tcpSend(JSON.stringify(data)))
ipcMain.on('udp', (_, data: object) => udpSend(JSON.stringify(data)))
ipcMain.on('EXIT', app.quit)
ipcMain.on('save-settings', saveSettings)

ipcMain.handle('read-settings', () => {
  try {
    return fs.readFileSync(process.env.__RESOURCES + '/settings.json').toString()
  }
  catch (e) {
    if ((e as (unknown & { message: string })).message.startsWith('ENOENT')) {
      fs.writeFileSync(process.env.__RESOURCES + '/settings.json', '{}')
      return '{}'
    }
    throw e
  }
})


udpReceive('/reverses', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/reverses', res))
udpReceive('/plane-model', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/plane-model', res))
udpReceive('/msfs-status', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/msfs-status', res))
