import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import exportFromJSON from 'export-from-json';


export default function HallBooking() {

  const context = useContext(AppContext);

  const { bookings, getBookings, deleteBooking, searchBooking } = context;
  const navigate = useNavigate();

  const [bookingSearch, setBookingSearch] = useState("")

  const data = bookings;
  const filename = 'download';
  const exportType = exportFromJSON.types.csv;

  function ExporttoExcel() {
    exportFromJSON({ data, filename, exportType })
  }


  useEffect(() => {
    if (bookingSearch.length === 0) {
      getBookings();
    }
    // eslint-disable-next-line
  }, [deleteBooking, bookingSearch]);

  function updateBookingDetails(bookingData) {
    navigate('/editHallBooking', { state: bookingData })
  }

  function handleSearch() {
    searchBooking(bookingSearch)
  }

  return (
    <>
      <div className='px-9'>
        <div className='bg-blue-500 p-3 my-5 text-white hover:bg-gray-400 cursor-pointer w-[9%]'>
          <Link to="/hallbookingform">New Booking</Link>
        </div>
        <div className='bg-blue-500 p-3 my-5 text-white hover:bg-gray-400 cursor-pointer w-[5%]' onClick={ExporttoExcel}>Export</div>
        <div className='flex flex-row'>
          <input type="text" value={bookingSearch} className='w-[20%]' onChange={(e) => setBookingSearch(e.target.value)} placeholder='Search' />
          <div className='bg-blue-500 px-4 text-white hover:bg-gray-400 cursor-pointer' onClick={handleSearch}>SEARCH</div>
        </div>
        <div className='grid grid-cols-5 mt-10 w-[85%]'>
          <div>संपूर्ण नांव</div>
          <div>सभागृह</div>
          <div>कार्यक्रम</div>
          <div>दिवस</div>
          <div>बुकिंगचा प्रकार</div>
        </div>
        <hr />
        <div>
          <div className='my-5'></div>
          {bookings.map((booking, index) => {
            return (
              <div className='flex flex-row my-5'>
                <div className='grid grid-cols-5 w-[85%]' key={index}>
                  <div>{booking.fullname}</div>
                  <div>{booking.hallno}</div>
                  <div>{booking.event}</div>
                  <div>{booking.eventdate}</div>
                  <div>{booking.bookingtype}</div>
                </div>
                <div className='flex flex-row'>
                  <div className='bg-blue-500 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer' onClick={() => updateBookingDetails(booking)}>EDIT</div>
                  <div className='bg-blue-500 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer' onClick={() => deleteBooking(booking.id)}>DELETE</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

