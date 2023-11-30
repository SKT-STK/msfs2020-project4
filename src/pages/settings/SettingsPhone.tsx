import SettingEntry from "@/components/app/settings/SettingEntry"

const SettingsPhone = () => {
  const handleOnChange = (v: number) => {
    if (v < 20_000 || v > 60_000) console.log('wrong input!')
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <SettingEntry text='Wireless Port'>
        <input type="number" className='text-right w-1/4 pr-4 [appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          onChange={e => handleOnChange(+e.target.value)}
        />
      </SettingEntry>
    </div>
  )
}
export default SettingsPhone

// port to be used
