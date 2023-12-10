import { ipcMain, BrowserWindow, app } from 'electron'
import net from 'net'
import dgram from 'dgram'
import * as fs from 'node:fs'
import * as fsp from 'node:fs/promises'
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

type EasingObjects = ({
  yoke_Easing: string | null
} & {
  throttles_Easing: string | null
}) | undefined

const writeEasings = async (data: EasingObjects) => {
  if (data && data.yoke_Easing) {
    writeHashedEasings(data.yoke_Easing, 'hashedYokeEasings.json').then(code => {
      code === 'error' && writeHashedEasings('x', 'hashedYokeEasings.json')
    })
  }
  if (data && data.throttles_Easing) {
    writeHashedEasings(data.throttles_Easing, 'hashedThrottlesEasings.json').then(code => {
      code === 'error' && writeHashedEasings('x', 'hashedThrottlesEasings.json')
    })
  }
}

const saveSettings = async (_: Electron.IpcMainEvent, ...args: unknown[]) => {
  const data = (args as object[])[0]
  fs.writeFile(process.env.__SETTINGS + '/settings.json', JSON.stringify(data), 'binary', () => {})
  writeEasings(data as EasingObjects)
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
ipcMain.on('EXIT', () => app.quit)
ipcMain.on('save-settings', saveSettings)

ipcMain.handle('read-settings', async () => (
  fsp.readFile(process.env.__SETTINGS + '/settings.json', 'binary')
    .catch(err => (
      (err as unknown & { message: string }).message.startsWith('ENOENT')
        ? fsp.mkdir(process.env.__SETTINGS, { recursive: false })
          .catch(() => {})
          .finally(() => {
            fs.writeFile(process.env.__SETTINGS + '/settings.json', '{}', 'binary', () => {})
            return '{}'
          })
        : (() => { throw err })()
    ))
    .then(data => data)
))


udpReceive('/reverses', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/reverses', res))
udpReceive('/plane-model', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/plane-model', res))
udpReceive('/msfs-status', res => BrowserWindow.getAllWindows()[0]?.webContents.send('/msfs-status', res))
