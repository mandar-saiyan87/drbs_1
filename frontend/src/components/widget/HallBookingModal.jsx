import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext';
import HallBookingSelectColumn from './HallBokingSelectColumn';

function HallBookingModal({ modalClose }) {

  const context = useContext(AppContext)
  const { exportHallbookings } = context

  const [columns, setColumns] = useState([])

  function handleExport() {
    exportHallbookings(columns)
    setColumns([])
    modalClose(false)
  }

  return (
    <div className='w-full max-w-xl bg-white max-h-max flex flex-col gap-4 px-10 py-5 absolute top-0 left-[35%]'>
      <p>Select Columns</p>
      <HallBookingSelectColumn columns={columns} setColumns={setColumns} />
      <div className='flex gap-4'>
        <button className='bg-blue-500 text-white px-2.5 py-1 rounded-md active:opacity-70 font-medium' onClick={handleExport}>Export</button>
        <button className='bg-blue-500 text-white px-2.5 py-1 rounded-md active:opacity-70 font-medium' onClick={() => modalClose(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default HallBookingModal
