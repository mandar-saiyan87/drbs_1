import React, { useContext} from 'react';
import { Link } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";


export default function HallBooking() {

  const context = useContext(AppContext);

  const { bookings, getBookings } = context;
  const navigate = useNavigate();

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line
  }, []);

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
      </div>
    </>
  )
}

