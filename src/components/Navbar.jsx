import React from 'react'

export default function Navbar() {
  return (
    <>
      <div className='bg-blue-400 p-3 w-screen flex flex-row shadow-md'>
        <div className='m-5 text-white text-xl cursor-pointer'>Member Registration</div>
        <div className='m-5 text-white text-xl cursor-pointer'>Hall Booking</div>
      </div>
    </>
  )
}
