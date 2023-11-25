import TopographicBackground from "@/components/global/TopographicBackground"
import NavBar from "@/components/private/NavBar"

const Settings = () => {
  return (<>
    <TopographicBackground steps={100} startHue={270} endHue={360} />
    {/* <ReturnToIndex /> */}
    <main className='min-h-screen w-full backdrop-blur-md backdrop-brightness-200'>
      <NavBar />
    </main>
  </>)
}
export default Settings
