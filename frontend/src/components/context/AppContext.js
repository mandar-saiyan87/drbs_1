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

  }

  // Get Hall Booking Details
  async function getBookings() {

  }

  // Add new Member Details
  async function addMember(newMember) {
    // console.log(members);
  }

  // Add new Hall Booking
  async function addBooking(newBooking) {
  }

  // Delete Member
  async function deleteMember(id) {

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
