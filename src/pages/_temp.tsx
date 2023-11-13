import { Canvas } from "@react-three/fiber"
import { Model } from '@/assets/Airplane'
// import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import deg2rad from "@/functions/DegreesToRadians"
// import { OrthographicCamera } from "@react-three/drei"
// import { useState } from "react"
// import { useInterval } from "@/hooks/useInterval"

// function calculateModelPosition(angle: number): [number, number, number] {
//   // Convert the angle from degrees to radians
//   const radians = angle * Math.PI / 180;

//   // Calculate the x position (no displacement in the x-axis)
//   const x = -195;

//   // Calculate the y position with the displacement
//   const y = Math.cos(radians);

//   // Calculate the z position with the displacement
//   const z = -1800 - 1075 * Math.sin(radians);

//   // Return the calculated position as an object
//   return [ x, y, z ]
// }


const _Temp = () => {
  // const [xrot, setXrot] = useState<number>(0)

  // useInterval(() => {
  //   setXrot(xrot - 1)
  //   if (xrot === -46) setXrot(45)
  // }, 50)

  return (
    <div className='w-screen h-screen'>
      <Canvas>
        {/* <OrthographicCamera makeDefault /> */}
        {/* <OrbitControls enableZoom={false} enablePan enableDamping enableRotate /> */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} />
        <Model position={[0, -10, -60]} rotation={[deg2rad(-30), deg2rad(180), deg2rad(40)]} />
      </Canvas>
    </div>
  )
}
export default _Temp
