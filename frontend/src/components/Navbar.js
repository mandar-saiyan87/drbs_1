import React, { useState } from 'react'
import { Link } from "react-router-dom";
import RefModal from './widget/RefModal';

export default function Navbar() {

  const [ref, setRef] = useState(false)
  return (
    <>
      <div className='bg-blue-400 px-4 py-6 w-full m-auto flex shadow-md items-center justify-between relative'>
        <div className='flex gap-10'>
          <div className='text-white text-xl cursor-pointer'>
            <Link to="/">Member Registrations</Link>
          </div>
          <div className='text-white text-xl cursor-pointer'>
            <Link to="/hallbookings">Hall Booking</Link>
          </div>
          <div className='text-white text-xl cursor-pointer'>
            <Link to="/Birthdays">Birthdays</Link>
          </div>
        </div>
        <p className='text-white cursor-pointer active:opacity-60' onClick={() => setRef(true)}>Label Ref</p>
        {ref && <RefModal onClose={setRef} />}
      </div>
    </>
  )
}
