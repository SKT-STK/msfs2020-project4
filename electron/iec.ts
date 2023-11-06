import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const child = require('child_process').execFile
const execName = 'cpp.exe'
const execPath = process.env.NODE_ENV?.trim() === 'dev' ?
  path.join("D:\\c++-projects\\MSFS2020\\Project4\\cpp\\x64_Release", execName)
  : path.join(path.dirname(process.execPath), execName)
export const port = ((Math.random() * (60_000 - 20_000 + 1)) | 0) + 20_000
const args = [String(port)]
child(execPath, args, (err: Error) => { throw new Error(err.name + ' -:- ' + err.message) })
