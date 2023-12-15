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
  }

  async function searchBooking(searchquery) {

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
      const new_members = members.filter(member => {
        return member._id != id
      })
      setMembers(new_members)
    }
  }

  // Delete Boooking
  async function deleteBooking(id) {

  }

  // Update member
  async function editMember(newMemberDetails, id) {

  }

  // Update Booking
  async function editBooking(newbookingDetails, id) {

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
