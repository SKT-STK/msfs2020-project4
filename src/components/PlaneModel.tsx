import { Model } from "@/assets/Airplane"
import deg2rad from "@/functions/DegreesToRadians"
import { useInterval } from "@/hooks/useInterval"
import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"

const PlaneModel = () => {
  const [rot, setRot] = useState<[number, number]>([0, 0])

  const path = '/plane-model'

  useEffect(() => {
    window.ipcRenderer.on(path, (_, data) => {
      setRot([data.x, data.z])
    })
    return () => {
      window.ipcRenderer.removeAllListeners(path)
    }
  }, [])

  useInterval(() => {
    window.ipcRenderer.send('udp', {path: path, msg: {}})
  }, 50)

  return (
    <div className='flex justify-center items-center flex-[1] border-b-4 border-[#767C]'>
      <Canvas className='fixed inset-0'>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} />
        <Model position={[0, -10, -60]} rotation={[deg2rad(rot[0]), deg2rad(180), deg2rad(rot[1])]} />
      </Canvas>
    </div>
  )
}
export default PlaneModel
