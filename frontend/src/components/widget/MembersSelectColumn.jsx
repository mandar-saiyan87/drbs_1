import React from 'react'

function MembersSelectColumn({ columns, setColumns }) {

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
          <input type="checkbox" checked={columns.includes('paymentmode')} value="paymentmode" onChange={handleSelect} />
          <span>paymentmode</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('livingStatus')} value="livingStatus" onChange={handleSelect} />
          <span>livingStatus</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('occupation')} value="occupation" onChange={handleSelect} />
          <span>occupation</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('checkno')} value="checkno" onChange={handleSelect} />
          <span>checkno</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('reference')} value="reference" onChange={handleSelect} />
          <span>reference</span>
        </label>
        {/* <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('fullname')} value="fullname" onChange={handleSelect} />
          <span>fullname</span>
        </label> */}
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('bloodgroup')} value="bloodgroup" onChange={handleSelect} />
          <span>bloodgroup</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('education')} value="education" onChange={handleSelect} />
          <span>education</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('address')} value="address" onChange={handleSelect} />
          <span>address</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('membership')} value="membership" onChange={handleSelect} />
          <span>membership</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('gotra')} value="gotra" onChange={handleSelect} />
          <span>gotra</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('dob')} value="dob" onChange={handleSelect} />
          <span>dob</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('mobile')} value="mobile" onChange={handleSelect} />
          <span>mobile</span>
        </label>
        {/* <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('memberno')} value="memberno" onChange={handleSelect} />
          <span>memberno</span>
        </label> */}
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('landline')} value="landline" onChange={handleSelect} />
          <span>landline</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('bankname')} value="bankname" onChange={handleSelect} />
          <span>bankname</span>
        </label>
        <label className='flex items-center justify-center gap-3'>
          <input type="checkbox" checked={columns.includes('checkdate')} value="checkdate" onChange={handleSelect} />
          <span>checkdate</span>
        </label>
      </div>
    </>
  )
}

export default MembersSelectColumn
