import React, { createContext, useState } from 'react';


const AppContext = createContext();

function DbsState(props) {

  // Firebase Collection


  const membersInit = [];

  const hallBookingsInit = [];


  const [searchedMember, setSearchedMember] = useState([])
  const [searchedBookings, setSearchedBookings] = useState([])
  const [notFound, setNotFound] = useState(false)

  const [pagination, setPagination] = useState({})
  const [searchpagination, setSearchPagination] = useState({})

  const [members, setMembers] = useState([]);

  const [bookings, setBookings] = useState([]);


  // Search Member

  async function searchMember(searchquery) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/members/search?query=${searchquery}`)
    const data = await req.json()

    if (data.status === 'Success') {
      setSearchedMember(data.members)
      setSearchPagination(data.pagination)
    }
    else if (data.status === 'Failed') {
      setNotFound(true)
    }
  }

  async function searchBooking(searchquery, page, limit) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/hallbooking/search?query=${searchquery}&page=${page}&limit=${limit}`)
    const data = await req.json()
    if (data.status === 'Success') {
      setSearchedBookings(data.bookings)
    }
    else if (data.status === 'Failed') {
      setNotFound(true)
    } 
  }


  // Get Member Details
  async function getMembers(page, limit) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/members/getmembers?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await req.json()
    // console.log(data)
    if (data.status === 'Success') {
      setMembers(data.members)
      setPagination(data.pagination)
    }
  }

  // Get Hall Booking Details
  async function getBookings() {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/hallbooking/getbookings`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await req.json()
    // console.log(data)
    if (data.status === 'Success') {
      // console.log(data.bookings)
      setBookings(data.bookings)
    }
  }

  // Add new Member Details
  async function addMember(newMember) {
    // console.log(members);
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/members/addmember`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newMember })
    })
    const data = await req.json()
    console.log(data)
  }

  // Add new Hall Booking
  async function addBooking(newBooking) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/hallbooking/newbooking`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newBooking })
    })
    const data = await req.json()
    console.log(data)
  }

  // Delete Member
  async function deleteMember(id) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/members/deletemember`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id })
    })
    const data = await req.json()
    // console.log(data)
    if (data.status === 'Success') {
      const new_members = bookings.filter(booking => {
        return booking._id !== id
      })
      setMembers(new_members)
    }
  }

  // Delete Boooking
  async function deleteBooking(id) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/hallbooking/deletebooking`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id })
    })
    const data = await req.json()
    // console.log(data)
    if (data.status === 'Success') {
      const new_bookings = bookings.filter(booking => {
        return booking._id !== id
      })
      setBookings(new_bookings)
    }
  }

  // Update member
  async function editMember(newMemberDetails, id) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/members/updatemember`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newMemberDetails, id })
    })
    const data = await req.json()
    console.log(data)
  }

  // Update Booking
  async function editBooking(newbookingDetails, id) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/hallbooking/updatebooking`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newbookingDetails, id })
    })
    const data = await req.json()
    console.log(data)
  }

  async function exportmembers(columnList) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/members/export-excel`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ columnList })
    })
    const data = await req.blob()
    const url = window.URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = url
    link.download = 'members_data.csv'
    link.click()
    // console.log(url)
  }

  async function exportHallbookings(columnList) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/hallbooking/export-excel`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ columnList })
    })
    const data = await req.blob()
    const url = window.URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = url
    link.download = 'hallbookings_data.csv'
    link.click()
    // console.log(url)
  }

  return (
    <>
      <AppContext.Provider value={{
        addMember,
        members,
        getMembers,
        deleteMember,
        editMember,
        bookings,
        addBooking,
        getBookings,
        deleteBooking,
        editBooking,
        searchMember,
        searchBooking,
        exportmembers,
        exportHallbookings,
        searchedMember,
        setSearchedMember,
        searchedBookings,
        setSearchedBookings,
        notFound,
        setNotFound,
        pagination,
        searchpagination

      }}>
        {props.children}
      </AppContext.Provider>
    </>
  )
}

export default DbsState
export { AppContext }
