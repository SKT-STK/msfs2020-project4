import { Model } from "@/assets/Airplane"
import deg2rad from "@/functions/DegreesToRadians"
import { useInterval } from "@/hooks/useInterval"
import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react"

const PlaneModel = () => {
  const [rot, setRot] = useState<[number, number]>([0, 0])

  useEffect(() => {
    window.ipcRenderer.on('/plane-model', (_, data) => {
      setRot([data.x, data.z])
    })
    return () => {
      window.ipcRenderer.removeAllListeners('/plane-model')
    }
  }, [])

  useInterval(() => {
    window.ipcRenderer.send('udp', {path: '/plane-model', msg: {}})
  }, 50)

  return (
    <div className='flex justify-center items-center flex-[1] border-b-4 border-[#767C]'>
      <Canvas className='fixed top-0 left-[0] right-0 bottom-0'>
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} />
        <Model position={[0, -10, -60]} rotation={[deg2rad(rot[0]), deg2rad(180), deg2rad(rot[1])]} />
      </Canvas>
    </div>
  )
}
export default PlaneModel
