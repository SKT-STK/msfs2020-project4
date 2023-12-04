import { useEffect, useRef } from 'react'

export const useInterval = (
  callback: () => void,
  delay: number | null,
  executeImmediately: boolean = false
) => {
  const savedCallback = useRef<() => void>(callback)
  const execNow = useRef<boolean>(executeImmediately)

  useEffect(() => {
    execNow && savedCallback.current()
  }, [])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(callback, delay)
    return () => clearInterval(id)
  }, [delay, callback])
}
