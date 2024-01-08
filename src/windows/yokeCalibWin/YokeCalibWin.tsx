// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Model } from "@/assets/models/Phone";
import Button from "@/windows/yokeCalibWin/components/Button";
import deg2rad from "@/functions/DegreesToRadians";
import { useInterval } from "@/hooks/useInterval";
import { useOnIpc } from "@/hooks/useOnIpc";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Variants, useAnimationControls } from "framer-motion";
import { ipcRenderer } from "electron";

const color = '#FF5'
const hoverColor = '#FF5'
const clickColor = '#5F5'

const animationVariants: Variants = {
  up: {
    boxShadow: `inset 0 0 15px 0px ${color}, 0 0 15px 0px ${color}`,
    scale: 1,
  },
  big: {
    boxShadow: `inset 0 0 20px 7px ${hoverColor}, 0 0 20px 7px ${hoverColor}`,
    scale: 1.1,
  },
  down: {
    boxShadow: `inset 0 0 20px 10px ${clickColor}, 0 0 20px 10px ${clickColor}`,
    scale: 0.8,
  }
}

export default function YokeCalibWin() {
  const [rot, setRot] = useState<[number, number]>([-1, -1])
  const persistentRotX = useRef<number>(rot[0])
  const persistentRotY = useRef<number>(rot[1])
  const controls1 = useAnimationControls()
  const controls2 = useAnimationControls()
  const controls3 = useAnimationControls()

  const path = '/plane-model'

  useOnIpc(path, (_, args) => {
    const data = args as { x: number, z: number }
    setRot([(data.x * 2) - 270, -data.z])
  })

  useInterval(() => {
    ipcRenderer.send('udp', {path: path, msg: {}})
  }, 20)

  return (<>
    <Canvas className='absolute min-h-screen w-full [&>div]:min-h-screen'>
      <ambientLight />
      <directionalLight position={[-2, 5, 2]} />
      <Model scale={.35} rotation={[deg2rad(rot[0]), deg2rad(rot[1]), deg2rad(90)]} />
    </Canvas>
    <Button
      animate={controls1}
      variants={animationVariants}
      initial='up'
      className='top-3 left-[2.5%] text-2xl w-[46%] py-2'
      whileHover={{
        boxShadow: `inset 0 0 20px 7px ${hoverColor}, 0 0 20px 7px ${hoverColor}`,
        textShadow: '0 0 15px #CCC',
      }}
      onClick={() => {
        persistentRotY.current = Math.abs(rot[1])
        controls1.start('big').then(() => controls1.start('down').then(() => controls1.start('up')))
      }}
    >
      ACCEPT ROLL
    </Button>
    <Button
      animate={controls2}
      variants={animationVariants}
      initial='up'
      className='top-3 right-[2.5%] text-2xl w-[46%] py-2'
      whileHover={{
        boxShadow: `inset 0 0 20px 7px ${hoverColor}, 0 0 20px 7px ${hoverColor}`,
        textShadow: '0 0 15px #CCC',
      }}
      onClick={() => {
        persistentRotX.current = Math.abs((rot[0] + 270) / 2)
        controls2.start('big').then(() => controls2.start('down').then(() => controls2.start('up')))
      }}
    >
      ACCEPT PITCH
    </Button>
    <Button
      animate={controls3}
      variants={animationVariants}
      initial='up'
      className='bottom-3 left-[2.5%] text-2xl right-[2.5%] py-2'
      whileHover={{
        boxShadow: `inset 0 0 20px 7px ${hoverColor}, 0 0 20px 7px ${hoverColor}`,
        textShadow: '0 0 15px #CCC',
      }}
      onClick={() => {
        ipcRenderer.send('close-yoke-window', [persistentRotY.current | 0, persistentRotX.current | 0])
        controls3.start('big').then(() => controls3.start('down').then(() => controls3.start('up')))
      }}
    >
    SAVE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AND&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EXIT
    </Button>
  </>)
}
