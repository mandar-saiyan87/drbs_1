import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className='bg-blue-400 p-3 w-screen flex flex-row shadow-md'>
        <div className='m-5 text-white text-xl cursor-pointer'>
          <Link to="/">Member Regitrations</Link>
        </div>
        <div className='m-5 text-white text-xl cursor-pointer'>
          <Link to="/hallbookings">Hall Booking</Link>
        </div>
      </div>
    </>
  )
}
