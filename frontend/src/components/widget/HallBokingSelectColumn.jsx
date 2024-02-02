import React from 'react'

function HallBookingSelectColumn({ columns, setColumns }) {

  function handleSelect(e) {
    const { checked, value } = e.target
    if (checked) {
      setColumns([...columns, value])
    } else {
      setColumns([...columns].filter(item => item !== value))
    }
  }

  return (
    <>
      <div className='flex flex-col gap-1 items-start'>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('address')} value="address" onChange={handleSelect} />
          <span>address</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('bankname')} value="bankname" onChange={handleSelect} />
          <span>bankname</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('bookingtype')} value="bookingtype" onChange={handleSelect} />
          <span>bookingtype</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('checkdate')} value="checkdate" onChange={handleSelect} />
          <span>checkdate</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('checkno')} value="checkno" onChange={handleSelect} />
          <span>checkno</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('deposit')} value="deposit" onChange={handleSelect} />
          <span>deposit</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('description')} value="description" onChange={handleSelect} />
          <span>description</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('event')} value="event" onChange={handleSelect} />
          <span>event</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('eventdate')} value="eventdate" onChange={handleSelect} />
          <span>eventdate</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('guestno')} value="guestno" onChange={handleSelect} />
          <span>guestno</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('hallno')} value="hallno" onChange={handleSelect} />
          <span>hallno</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('mobile')} value="membership" onChange={handleSelect} />
          <span>membership</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('membership')} value="paymentmode" onChange={handleSelect} />
          <span>paymentmode</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('receiptdate')} value="receiptdate" onChange={handleSelect} />
          <span>receiptdate</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('receiptno')} value="receiptno" onChange={handleSelect} />
          <span>receiptno</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('rent')} value="rent" onChange={handleSelect} />
          <span>rent</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('total')} value="total" onChange={handleSelect} />
          <span>total</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('totalamount')} value="totalamount" onChange={handleSelect} />
          <span>totalamount</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('totalwords')} value="totalwords" onChange={handleSelect} />
          <span>totalwords</span>
        </label>
      </div>
    </>
  )
}

export default HallBookingSelectColumn
