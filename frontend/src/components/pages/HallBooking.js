import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";
import HallBookingModal from '../widget/HallBookingModal';



export default function HallBooking() {

  const context = useContext(AppContext);

  const { bookings, getBookings, deleteBooking, searchBooking } = context;
  const navigate = useNavigate();

  const [bookingSearch, setBookingSearch] = useState("")

  const [isModal, setModal] = useState(false)

  // const data = bookings;
  // const filename = 'download';
  // const exportType = exportFromJSON.types.csv;

  // function ExporttoExcel() {
  //   exportFromJSON({ data, filename, exportType })
  // }


  useEffect(() => {
    if (bookingSearch.trim() === "") {
      getBookings();
    }
    // eslint-disable-next-line
  }, [bookingSearch]);

  function updateBookingDetails(bookingData) {
    navigate('/editHallBooking', { state: bookingData })
  }

  function handleSearch() {
    searchBooking(bookingSearch)
  }

  return (
    <>
      <div className='px-9 pb-3'>
        <div className='max-w-max'>
          <Link to="/hallbookingform">
            <div className='bg-blue-500 py-3 px-4 my-6 text-white hover:bg-gray-400 cursor-pointer max-w-max rounded-md'>New Booking</div>
          </Link>
        </div>
        <div className='bg-blue-500 py-3 px-4 my-6 text-white hover:bg-gray-400 cursor-pointer max-w-max rounded-md' onClick={() => setModal(true)}>Export</div>
        <div className='flex flex-row'>
          <input type="text" value={bookingSearch} className='w-[20%] p-2 rounded-tl-md rounded-bl-md' onChange={(e) => setBookingSearch(e.target.value)} placeholder='Search' />
          <div className='bg-blue-500 px-4 text-white flex items-center justify-center hover:bg-gray-400 cursor-pointer rounded-tr-md rounded-br-md'
            onClick={handleSearch}>SEARCH</div>
        </div>
        <div className='grid grid-cols-5 mt-10 w-[85%]'>
          <div className='flex text-left'>संपूर्ण नांव</div>
          <div className='flex text-left'>सभागृह</div>
          <div className='flex text-left'>कार्यक्रम</div>
          <div className='flex text-left'>दिवस</div>
          <div className='flex text-left'>बुकिंगचा प्रकार</div>
        </div>
        <hr />
        <div>
          <div className='my-5'></div>
          {bookings.map((booking) => {
            return (
              <div className='flex flex-row my-5' key={booking._id}>
                <div className='grid grid-cols-5 w-[85%]'>
                  <div className='flex items-center justify-start'><p>{booking.fullname}</p></div>
                  <div className='flex items-center justify-start'><p>{booking.hallno}</p></div>
                  <div className='flex items-center justify-start'><p>{booking.event}</p></div>
                  <div className='flex items-center justify-start'><p>{booking.eventdate}</p></div>
                  <div className='flex items-center justify-start'><p>{booking.bookingtype}</p></div>
                </div>
                <div className='flex flex-row items-center justify-center'>
                  <div className='bg-blue-500 py-1 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer rounded-md'
                    onClick={() => updateBookingDetails(booking)}>EDIT</div>
                  <div className='bg-blue-500 py-1 px-4 mx-2 text-white hover:bg-gray-400 cursor-pointer rounded-md' onClick={() => deleteBooking(booking._id)}>DELETE</div>
                </div>
              </div>
            )
          })}
        </div>
        {
          isModal && <HallBookingModal modalClose={setModal} />
        }
      </div>
    </>
  )
}

