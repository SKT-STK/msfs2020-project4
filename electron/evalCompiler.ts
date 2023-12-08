import * as fs from 'node:fs';

export const writeHashedEasings = (input: string) => {
  let decode = input.replace(/\\frac{/g, '{')

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

  decode = decode.replace(/\\left/g, '')
  decode = decode.replace(/\\right/g, '')
  decode = decode.replace(/\\cdot/g, '*')
  decode = decode.replace(/\\exp/g, 'Math.exp')
  decode = decode.replace(/\\operatorname{abs}/g, 'Math.abs')
  decode = decode.replace(/3.14/g, 'Math.PI')
  decode = decode.replace(/\^/g, '**')

  decode = decode.replace(/-/g, '-1*')
  decode = decode.replace(/}{/g, '}/{')
  decode = decode.replace(/{/g, '(')
  decode = decode.replace(/}/g, ')')

  decode = decode.replace(/x/g, '(@)')
  decode = decode.replace(/.e(@)p/g, '.exp')

  const arr = []
  for (let i = 0; i <= 1.001; i += 0.001) {
    const code = decode.replace(/@/g, i.toString())
    const result = +new Function(`return ${code}`)()
    const newRes = +(result * 100).toFixed(2)
    arr.push(newRes)
  }

  fs.writeFileSync(process.env.VITE_PUBLIC + '/hashedEasings.json', JSON.stringify([...arr]))
}
