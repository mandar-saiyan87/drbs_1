import './App.css';
import { Routes, Route } from "react-router-dom";

import MembersForm from './components/pages/MembersForm';
import Navbar from './components/Navbar';
import DbsState from './components/context/AppContext';
import MembersPage from './components/pages/MembersPage';
import EditMembers from './components/pages/EditMembers';
import HallBooking from './components/pages/HallBooking';
import HallBookingForm from './components/pages/HallBookingForm';
import EditHallBooking from './components/pages/EditHallBooking';
import BirthDayList from './components/pages/BirthDayList';


function App() {
  return (
    <>
      <div className='bg-[#d9fbfb] max-w-[1536px] m-auto min-h-screen'>
        <DbsState>
          <Navbar />

          <Routes>
            <Route path='/' element={<MembersPage />} />
            <Route path='/membersform' element={<MembersForm />} />
            <Route path='/editMembers' element={<EditMembers />} />
            <Route path='/hallbookings' element={<HallBooking />} />
            <Route path='/hallbookingform' element={<HallBookingForm />} />
            <Route path='/editHallBooking' element={<EditHallBooking />} />
            <Route path='/Birthdays' element={<BirthDayList />} />
          </Routes>
        </DbsState>
      </div>
    </>
  );
}

export default App;
