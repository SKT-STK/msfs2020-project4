import { Model } from "@/assets/models/Airplane"
import deg2rad from "@/functions/DegreesToRadians"
import { useInterval } from "@/hooks/useInterval"
import { useOnIpc } from "@/hooks/useOnIpc"
import { Canvas } from "@react-three/fiber"
import { ipcRenderer } from "electron"
import { useState } from "react"

const PlaneModel = () => {
  const [rot, setRot] = useState<[number, number]>([0, 0])

  const path = '/plane-model'

  useOnIpc(path, (_, args) => {
    const data = args as { x: number, z: number }
    setRot([data.x / -2.5, data.z])
  })

  useInterval(() => {
    ipcRenderer.send('udp', {path: path, msg: {}})
  }, 100)

  return (
    <div className='flex justify-center items-center flex-1 border-b-4 border-[#FFF]'>
      <Canvas className='fixed inset-0'>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} />
        <Model position={[0, -10, -60]} rotation={[deg2rad(rot[0]), deg2rad(180), deg2rad(rot[1])]} />
      </Canvas>
    </div>
  )
}
export default PlaneModel
