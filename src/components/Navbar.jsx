import React from 'react'

function Navbar({logo}) {
  return (
    <div className='flex items-center gap-2'>
        <img src={logo} className='w-10' />
        <h5 className='font-bold text-blue-800'>Your Life, In Receipts</h5>
    </div>
  )
}

export default Navbar