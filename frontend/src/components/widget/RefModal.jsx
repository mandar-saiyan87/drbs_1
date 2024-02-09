import React from 'react'

function RefModal({ onClose }) {
  return (
    <>
      <div className='w-full max-w-xl bg-white max-h-max flex flex-col px-10 py-5 absolute top-10 left-[35%] z-10'>
        <div className='flex items-center justify-between'>
          <p>Label Ref</p>
          <div className='flex font-semibold text-xs bg-gray-300 px-2 py-1 rounded-full text-center cursor-pointer' onClick={() => onClose(false)}>
            X
          </div>
        </div>
        <div className='my-3 border-[1px] border-black px-3 py-1'>
          <h3 className='my-2'>Members</h3>
          <p className='my-1'>आश्रयदाते : <span></span>Patrons</p>
          <p className='my-1'>आजीव : <span></span>Lifetime</p>
          <p className='my-1'>हितचिंतक : <span></span>Well Wisher</p>
          <p className='my-1'>रोख : <span></span>Cash</p>
          <p className='my-1'>धनादेश : <span></span>Cheque</p>
          <p className='my-1'>हयात : <span></span>Alive</p>
          <p className='my-1'>मृत : <span></span>Deceased</p>
        </div>
        <div className='my-3 border-[1px] border-black px-3 py-1'>
          <h3 className='my-2'>Hall Booking</h3>
          <p className='my-1'>लग्न : <span></span>Marriage</p>
          <p className='my-1'>मुंज : <span></span>Munj</p>
          <p className='my-1'>इतर सांस्कृतिक कार्यक्रम : <span></span>Other Cultural Event</p>
          <p className='my-1'>नृत्य : <span></span>Dance</p>
          <p className='my-1'>नाट्य : <span></span>Drama</p>
          <p className='my-1'>संगीत : <span></span>Music</p>
          <p className='my-1'>सभा : <span></span>Meeting</p>
          <p className='my-1'>इतर : <span></span>Other</p>
        </div>
      </div>
    </>
  )
}

export default RefModal
