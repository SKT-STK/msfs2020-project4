import { useLocation } from "react-router-dom";

function UseLocationWrapper() {
  const location = useLocation()
  return location
}

export const useSearchParams = (_location: Location | null) => {
  const location = _location || UseLocationWrapper()
  const params = new URLSearchParams(location.search)
  const retArr: string[] = []

  params.forEach(v => {
    retArr.push(v)
  })
  
  return retArr
}
