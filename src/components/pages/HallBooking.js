import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";


export default function HallBooking() {

  const context = useContext(AppContext);

  const { bookings, getBookings, deleteBooking } = context;
  const navigate = useNavigate();

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line
  }, [deleteBooking]);

  function updateBookingDetails(bookingData) {
    navigate('/editHallBooking', { state: bookingData })
  }

  return (
    <>
      <div className='px-9'>
        <div className='bg-blue-500 p-3 my-5 text-white hover:bg-gray-400 cursor-pointer w-[9%]'>
          <Link to="/hallbookingform">New Booking</Link>
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

