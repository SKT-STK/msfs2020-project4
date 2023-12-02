import { useEffect, useRef } from 'react'

export const useInterval = (callback: () => void, delay: number | null, executeImmediately: boolean = false) => {
  const savedCallback = useRef<() => void>(callback)

  executeImmediately && savedCallback.current()

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(savedCallback.current, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
