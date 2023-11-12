import { bufferToMsgObj } from './../src/functions/DestructureUdpResponse'
// import { port } from './iec'
import dgram from 'dgram'

const client = dgram.createSocket('udp4')

export const udpSend = (msg: string) => client.send(msg, 2642, '127.0.0.1')

const paths: Map<string, (_: any) => void> = new Map()
export const udpReceive = (path: string, func: (_: any) => void) => paths.set(path, func)

client.on('message', data => bufferToMsgObj(data, ({msg}) => paths.forEach((v, k) => {if (msg.path === k) v(msg.msg)})))

client.on('error', err => {
  console.error('UdpClientError: ', err)
})
