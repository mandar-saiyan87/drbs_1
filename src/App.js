import './App.css';
import { Routes, Route } from "react-router-dom";

import MembersForm from './components/pages/MembersForm';
import Navbar from './components/Navbar';
import DbsState from './components/context/AppContext';
import MembersPage from './components/pages/MembersPage';
import EditMembers from './components/pages/EditMembers';
import HallBooking from './components/pages/HallBooking';
import HallBookingForm from './components/pages/HallBookingForm';


function App() {
  return (
    <>
      <DbsState>
        <Navbar />
        <Routes>
          <Route path='/' element={<MembersPage />} />
          <Route path='/membersform' element={<MembersForm />} />
          <Route path='/editMembers' element={<EditMembers />} />
          <Route path='/hallbookings' element={<HallBooking />} />
          <Route path='/hallbookingform' element={<HallBookingForm />} />
        </Routes>
      </DbsState>

    </>
  );
}

export default App;
