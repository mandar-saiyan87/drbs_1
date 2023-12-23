import React, { createContext, useState } from 'react';


const AppContext = createContext();

function DbsState(props) {

  // Firebase Collection


  const membersInit = [];

  const hallBookingsInit = [];


  const [members, setMembers] = useState(membersInit);

  const [bookings, setBookings] = useState(hallBookingsInit);


  // Search Member

  async function searchMember(searchquery) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/members/search?query=${searchquery}`)
    const data = await req.json()
    if (data.status === 'Success') {
      setMembers(data.members)
    }
  }

  async function searchBooking(searchquery) {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/hallbooking/search?query=${searchquery}`)
    const data = await req.json()
    if (data.status === 'Success') {
      setBookings(data.booking)
    }
  }


  // Get Member Details
  async function getMembers() {
    const req = await fetch(`${process.env.REACT_APP_API_SRV}/api/members/getmembers`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await req.json()
    // console.log(data)
    if (data.status === 'Success') {
      setMembers(data.members)
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
      console.log(data.bookings)
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
        searchBooking
      }}>
        {props.children}
      </AppContext.Provider>
    </>
  )
}

export default DbsState
export { AppContext }
