import NavBarEntry from "@/components/app/settings/NavBarEntry"

const NavBar = () => {
  return (
    <section className=' relative col-start-1 col-end-3 row-start-1 flex gap-3 pt-3
      row-end-1 border-r-slate-700 border-r-2 bg-[#1A1A1E] flex-col'
    >
      <NavBarEntry url="/phone">PHONE</NavBarEntry>
      <NavBarEntry url="/yoke">YOKE</NavBarEntry>
      <NavBarEntry url="/throttles">THROTTLES</NavBarEntry>
      <NavBarEntry url="/reverses">REVERSES</NavBarEntry>
    </section>
  )
}
export default NavBar
