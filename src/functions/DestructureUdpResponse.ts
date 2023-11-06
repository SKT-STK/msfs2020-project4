export const bufferToMsgObj = (data: Buffer, func: ({ msg }: { msg: { path: string, msg: any } }) => void) => func(JSON.parse(data.toString()))
