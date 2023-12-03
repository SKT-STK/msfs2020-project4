import { useCallback, useEffect } from 'react'

export const useInterval = (
  callback: () => void,
  delay: number | null,
  executeImmediately: boolean = false
) => {
  const savedCallback = useCallback<() => void>(callback, [])

  useEffect(() => {
    executeImmediately && savedCallback()
  }, [])

  useEffect(() => {
    if (delay === null) return
    const id = setInterval(callback, delay)
    return () => clearInterval(id)
  }, [delay, callback])
}
