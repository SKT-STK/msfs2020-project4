import { useEffect, useState } from "react";

export default function useMousePos() {
  const [mousePos, setMousePos] = useState<{ x: number, y: number }>({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  })

  return mousePos
}
