import SVG from "@/components/SVG"
import svg from '@/assets/react.svg'

const _Temp = () => {
  return (<>
    <div onClick={() => window.ipcRenderer.send('tcp', 'xdd')}>
      <SVG src={svg} color="#55F" />
    </div>
    <div onClick={() => window.ipcRenderer.send('tcp', 'xyz')}>
      <SVG src={svg} color="#F55" />
    </div>
    <div onClick={() => window.ipcRenderer.send('tcp', 'abc')}>
      <SVG src={svg} color="#5F5" />
    </div>
  </>)
}
export default _Temp
