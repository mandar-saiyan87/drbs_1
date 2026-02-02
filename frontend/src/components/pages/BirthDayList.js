import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { dateFormat, dobFormat } from '../../helper/dateFunc'


function BirthDayList() {

  const context = useContext(AppContext)

  const { allmembers, getAllMembers } = context

  // const today = new Date(currentIST).toISOString().split('T')[0];

  useEffect(() => {
    getAllMembers()
  })

  return (
    <div className='w-full px-9 m-auto py-5'>
      <h1 className='text-lg font-semibold tracking-wide'>Today's Birthdays</h1>
      <div className='w-full mx-auto my-5'>
        <div className='grid grid-cols-2 gap-5 font-semibold'>
          <p>Member</p>
          <p>Birthday</p>
        </div>
        <div>
          {allmembers.map(member => {

            return (
              // <div key={member._id}>{member.fullname}</div>
              <div className='grid grid-cols-2 gap-5 my-2' key={member._id}>
                <p>{member?.fullname}</p>
                <p>{dobFormat(member?.dob)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BirthDayList