
const N1Limiter = () => {
  return (
    <div className='flex-1 h-full flex justify-center items-center w-full text-center
      flex-col'>
      <h1 className='mb-[30px] text-5xl'>N1 Limit</h1>
      <input type="number"
        className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none text-center focus:outline-0
          bg-transparent w-[200px] border-x-transparent border-t-transparent border-b-[#767C]
          border-8 text-[50px] rounded-[50px] focus:border-b-[#FF5]'
        onChange={e => window.ipcRenderer.send('tcp',
          {path: '/max-n1', val: Number(e.target.value)})}
      />
    </div>
  )
}
export default N1Limiter
