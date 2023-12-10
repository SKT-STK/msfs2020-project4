import * as fs from 'node:fs';

type ErrorSuccess = 'error' | 'success'

export const writeHashedEasings: (input: string, fileName: string) => Promise<ErrorSuccess> = async (input, fileName) => {
  let decode = input.replace(/ /, '')
  decode = decode.replace(/y=/g, '')
  decode = decode.replace(/f\(x\)=/g, '')

  decode = input.replace(/\\frac\{/g, '{')

  decode = decode.replace(/1\\left/g, '1*')
  decode = decode.replace(/2\\left/g, '2*')
  decode = decode.replace(/3\\left/g, '3*')
  decode = decode.replace(/3\\left/g, '4*')
  decode = decode.replace(/4\\left/g, '4*')
  decode = decode.replace(/5\\left/g, '5*')
  decode = decode.replace(/6\\left/g, '6*')
  decode = decode.replace(/7\\left/g, '7*')
  decode = decode.replace(/8\\left/g, '8*')
  decode = decode.replace(/9\\left/g, '9*')

  decode = decode.replace(/\\cdot/g, '*')
  decode = decode.replace(/\\operatorname\{(.*?)\}/g, 'Math.$1')
  decode = decode.replace(/\^/g, '**')

  decode = decode.replace(/PI/g, 'Math.PI')
  decode = decode.replace(/PI\\left/g, 'Math.PI*')
  decode = decode.replace(/E/g, 'Math.E')
  decode = decode.replace(/E\\left/g, 'Math.E*')

  decode = decode.replace(/\\left/g, '')
  decode = decode.replace(/\\right/g, '')

  decode = decode.replace(/-/g, '-1*')
  decode = decode.replace(/\}\{/g, '}/{')
  decode = decode.replace(/\{/g, '(')
  decode = decode.replace(/\}/g, ')')

  decode = decode.replace(/x/g, '@')
  decode = decode.replace(/e@p/g, 'exp')
  decode = decode.replace(/@/g, '(@)')

  decode = decode.replace(/\\/g, 'Math.')

  const arr = []
  for (let i = 0; i <= 1.001; i += 0.001) {
    const code = decode.replace(/@/g, i.toString())
    let result: number
    try {
      result = +new Function(`return ${code}`)()
      if (Number.isNaN(result)) return 'error'
    }
    catch {
      return 'error'
    }
    const newRes = +(result * 100).toFixed(2)
    arr.push(newRes)
  }

  fs.writeFile(process.env.__SETTINGS + '/' + fileName, JSON.stringify([...arr]), 'binary', () => {})
  return 'success'
}
