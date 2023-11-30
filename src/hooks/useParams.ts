import { useLocation } from "react-router-dom";

function UseLocationWrapper() {
  const location = useLocation()
  return location
}

export default function useParams(_location: Location | null, ..._params: string[]) {
  const location = _location || UseLocationWrapper()
  const params = new URLSearchParams(location.search)

  return _params.map(v => params.get(v))
}
