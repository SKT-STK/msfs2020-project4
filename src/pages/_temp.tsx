import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef } from "react"
import { Model } from '@/assets/Airplane'
// import { Vector3 } from "three"

const _Temp = () => {
  const model = useRef<THREE.Group>(null!)
  const camera = useRef<THREE.PerspectiveCamera>(null!)

  useEffect(() => {
    camera.current.lookAt(2000, -1000, -200)
  })

  return (
    <div className='w-screen h-screen'>
      <Canvas>
        <PerspectiveCamera ref={camera} makeDefault position={[0, 0, 5]} far={3500} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} />
        <OrbitControls enableZoom={false} />
        <Suspense fallback={null}>
          <Model ref={model} position={[2000, -1000, -200]} scale={1} />
        </Suspense>
      </Canvas>
    </div>
  )
}
export default _Temp
