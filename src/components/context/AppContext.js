import React, { createContext, useState } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc, query, updateDoc, where } from "firebase/firestore";
import { db } from "./Firebase/firebaseConfig";

const AppContext = createContext();

function DbsState(props) {

  // Firebase Collection
  const membersCollection = collection(db, 'members');

  const bookingCollection = collection(db, 'hallbookings')

  const membersInit = [];

  const hallBookingsInit = [];


  const [members, setMembers] = useState(membersInit);

  const [bookings, setBookings] = useState(hallBookingsInit);


  // Search Member

  async function searchMember(searchquery) {
    try {
      const q = query(membersCollection, where("mobile", "==", searchquery))
      const allmembers = await getDocs(q)
      // console.log(allTodos.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      const memberList = allmembers.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setMembers(memberList)
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }

  async function searchBooking(searchquery) {
    try {
      const q = query(bookingCollection, where("hallno", "==", searchquery))
      const allBookings = await getDocs(q)
      // console.log(allTodos.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      const bookingList = allBookings.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setBookings(bookingList)
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }


  // Get Member Details
  async function getMembers() {
    try {
      const q = query(membersCollection)
      const allMembers = await getDocs(q)
      const memberList = allMembers.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setMembers(memberList)
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }

  // Get Hall Booking Details
  async function getBookings() {
    try {
      const qb = query(bookingCollection)
      const allBookings = await getDocs(qb)
      const bookingList = allBookings.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setBookings(bookingList)
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }

  // Add new Member Details
  async function addMember(newMember) {
    try {
      await addDoc(membersCollection, newMember)
      setMembers(members.concat(newMember));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // console.log(members);
  }

  // Add new Hall Booking
  async function addBooking(newBooking) {
    try {
      await addDoc(bookingCollection, newBooking)
      setBookings(bookings.concat(newBooking));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // console.log(members);
  }

  // Delete Member
  async function deleteMember(id) {

    try {
      await deleteDoc(doc(db, "members", id));
      const newMembers = members.filter(member => {
        return member.id !== id;
      })
      setMembers(newMembers)
    } catch (e) {
      console.error("Error deleting documents: ", e);
    }

  }

  // Delete Boooking
  async function deleteBooking(id) {

    try {
      await deleteDoc(doc(db, "hallbookings", id));
      const newBookings = bookings.filter(booking => {
        return booking.id !== id;
      })
      setMembers(newBookings)
    } catch (e) {
      console.error("Error deleting documents: ", e);
    }

  }

  // Update member
  async function editMember(newMemberDetails, id) {

    try {
      const editedDoc = doc(membersCollection, id);

      await updateDoc(editedDoc, newMemberDetails);

      const editedMembers = members.map(elem => {
        if (elem.id === id) {
          return {
            ...elem,
            membership: elem.membership,
            paymentmode: elem.paymentmode,
            checkno: elem.checkno,
            checkdate: elem.checkdate,
            bankname: elem.bankname,
            fullname: elem.fullname,
            memberno: elem.memberno,
            address: elem.address,
            dob: elem.dob,
            landline: elem.landline,
            mobile: elem.mobile,
            bloodgroup: elem.bloodgroup,
            education: elem.education,
            gotra: elem.gotra,
            occupation: elem.occupation,
            reference: elem.reference,
            livingStatus: elem.livingStatus,
          }
        }
        return elem;
      })
      setMembers(editedMembers)
    } catch (e) {
      console.error("Error updating documents: ", e);
    }
  }

  // Update Booking
  async function editBooking(newbookingDetails, id) {

    try {
      const editedDoc = doc(bookingCollection, id);

      await updateDoc(editedDoc, newbookingDetails);

      const editedBooking = bookings.map(elem => {
        if (elem.id === id) {
          return {
            ...elem,
            event: elem.event,
            description: elem.description,
            fullname: elem.fullname,
            address: elem.address,
            memberno: elem.memberno,
            membership: elem.membership,
            orgaddress: elem.orgaddress,
            bookingtype: elem.bookingtype,
            eventdate: elem.eventdate,
            guestno: elem.guestno,
            hallno: elem.hallno,
            rent: elem.rent,
            deposit: elem.deposit,
            total: elem.total,
            totalwords: elem.totalwords,
            paymentmode: elem.paymentmode,
            checkno: elem.checkno,
            checkdate: elem.checkdate,
            bankname: elem.bankname,
            totalamount: elem.totalamount,
            receiptno: elem.receiptno,
            receiptdate: elem.receiptdate,
            membercode: elem.membercode,
          }
        }
        return elem;
      })
      setMembers(editedBooking)
    } catch (e) {
      console.error("Error updating documents: ", e);
    }
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
