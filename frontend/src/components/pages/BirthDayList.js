import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { dobFormat } from '../../helper/dateFunc'
import { ScaleLoader } from 'react-spinners'

// Returns today's date as yyyy-mm-dd (native date input format)
function getTodayISO() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  return `${year}-${month}-${day}`
}

// Formats a yyyy-mm-dd string to dd/mm/yyyy for display
function formatForDisplay(isoStr) {
  if (!isoStr) return ''
  const [yyyy, mm, dd] = isoStr.split('-')
  return `${dd}/${mm}/${yyyy}`
}

// Parses a yyyy-mm-dd string as LOCAL midnight (avoids UTC offset shifting the date)
function parseISOAsLocal(isoStr) {
  const [y, m, d] = isoStr.split('-')
  return new Date(+y, +m - 1, +d)
}

// Check if a member's birthday (day & month) falls within the from–to date range (ignoring year)
function isBirthdayInRange(dob, fromISO, toISO) {
  const birthday = new Date(dob)
  const bMonth = birthday.getMonth() // 0-indexed
  const bDay = birthday.getDate()

  // Parse as local midnight so UTC offset doesn't shift the date
  const from = parseISOAsLocal(fromISO)
  const to = parseISOAsLocal(toISO)

  // Use from's year as base to compare day/month only
  const baseYear = from.getFullYear()
  const bDate = new Date(baseYear, bMonth, bDay)

  // If range wraps across year end (e.g. Dec → Jan), handle both sides
  if (to < from) {
    const toFixed = new Date(baseYear, to.getMonth(), to.getDate())
    return bDate >= from || bDate <= toFixed
  }

  const toFixed = new Date(baseYear, to.getMonth(), to.getDate())
  return bDate >= from && bDate <= toFixed
}

function BirthDayList() {

  const context = useContext(AppContext)
  const { allmembers, getAllMembers } = context

  const [loading, setLoading] = useState(false)
  const [fromDate, setFromDate] = useState(getTodayISO())
  const [toDate, setToDate] = useState(getTodayISO())

  useEffect(() => {
    async function fetchallmembers() {
      setLoading(true)
      await getAllMembers()
      setLoading(false)
    }
    fetchallmembers()
  }, [])

  const birthdayList = (allmembers?.filter(member =>
    member?.dob && isBirthdayInRange(member.dob, fromDate, toDate)
  ) || []).sort((a, b) => {
    const dA = new Date(a.dob)
    const dB = new Date(b.dob)
    if (dA.getMonth() !== dB.getMonth()) return dA.getMonth() - dB.getMonth()
    return dA.getDate() - dB.getDate()
  })

  const today = getTodayISO()
  const isToday = fromDate === today && toDate === today
  const isSingleDay = fromDate === toDate

  let heading = "Today's Birthdays"
  if (!isToday && isSingleDay) heading = `Birthdays on ${formatForDisplay(fromDate)}`
  else if (!isToday) heading = `Birthdays from ${formatForDisplay(fromDate)} to ${formatForDisplay(toDate)}`

  return (
    <div className='w-full px-9 m-auto py-5'>
      <h1 className='text-lg font-semibold tracking-wide'>{heading}</h1>

      {/* Date Range Selector */}
      <div className='flex items-center gap-4 my-4'>
        <div className='flex items-center gap-2'>
          <label className='text-sm font-medium text-gray-600'>From</label>
          <input
            type='date'
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            className='border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400'
          />
        </div>
        <div className='flex items-center gap-2'>
          <label className='text-sm font-medium text-gray-600'>To</label>
          <input
            type='date'
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            className='border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400'
          />
        </div>
        <button
          onClick={() => { setFromDate(today); setToDate(today) }}
          className='text-sm text-blue-500 hover:underline'
        >
          Reset to Today
        </button>
      </div>

      <div className='w-full mx-auto my-5'>
        {/* Table Header */}
        <div className='grid grid-cols-4 gap-5 font-semibold border-b pb-2'>
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
          {!loading && birthdayList.length > 0 && birthdayList.map(member => (
            <div className='grid grid-cols-4 gap-5 my-2' key={member._id}>
              <p>{member?.fullname}</p>
              <p>{dobFormat(member?.dob)}</p>
              <p>{member?.mobile}</p>
              <p>{member?.landline}</p>
            </div>
          ))}
          {!loading && birthdayList.length === 0 &&
            <div className='w-full flex items-center justify-center my-10 text-gray-500'>
              No birthdays found for the selected date range.
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default BirthDayList
