import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { dateFormat, dobFormat } from '../../helper/dateFunc'
import { ScaleLoader } from 'react-spinners'


function BirthDayList() {

  const context = useContext(AppContext)

  const { allmembers, getAllMembers } = context

  const [loading, setLoading] = useState(false)

  const birthdayList = allmembers?.filter(members => dateFormat() === dobFormat(members?.dob)) || []

  // const today = new Date(currentIST).toISOString().split('T')[0];

  useEffect(() => {

    async function fetchallmembers() {
      setLoading(true)
      await getAllMembers()
      setLoading(false)
    }
    fetchallmembers()
  }, [])

  return (
    <div className='w-full px-9 m-auto py-5'>
      <h1 className='text-lg font-semibold tracking-wide'>Today's Birthdays</h1>
      <div className='w-full mx-auto my-5'>
        <div className='grid grid-cols-4 gap-5 font-semibold'>
          <p>Member</p>
          <p>Birthday</p>
          <p>Mobile No.</p>
          <p>Landline</p>
        </div>
        <div>
          {loading &&
            <div className="w-full flex items-center justify-center my-10">
              <ScaleLoader color='#4988C4' loading={loading} />
            </div>
          }
          {!loading && birthdayList.length > 0 && (birthdayList.map(member => {
            return (
              // <div key={member._id}>{member.fullname}</div>
              < div className='grid grid-cols-4 gap-5 my-2' key={member._id} >
                <p>{member?.fullname}</p>
                <p>{dobFormat(member?.dob)}</p>
                <p>{member?.mobile}</p>
                <p>{member?.landline}</p>
              </ div>

            )
          }))}
          {!loading && birthdayList.length === 0 && <div className='w-full flex items-center justify-center my-10'>No Birthdays Today</div>}
        </div>
      </div>
    </div>
  )
}

export default BirthDayList

