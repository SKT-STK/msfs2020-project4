import net from 'net'

const client = new net.Socket()

export const tcpSend = (msg: string, func: () => void) => client.connect(55411, '127.0.0.1', () => {
  client.write(msg, () => {
    client.end(() => {
      func()
    })
  })
})
