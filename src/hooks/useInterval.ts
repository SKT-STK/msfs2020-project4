import { useEffect, useRef } from 'react'

export const useInterval = (callback: () => void, delay: number | null, executeImmediately: boolean = false) => {
  const savedCallback = useRef<() => void | null>()

  useEffect(() => {
    if (executeImmediately) callback()
    savedCallback.current = callback
  }, [callback, executeImmediately])

  useEffect(() => {
    const tick = () => {
      if(savedCallback.current) savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
