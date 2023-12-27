import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home-page/home';
import LoginPage from './components/login-page/login';
import UserProfile from './components/user-profile-page/user-profile'
import MemberList from './components/member-list-page/member-list';
import StaffList from './components/staff-list-page/staff-list';
import EventPost from './components/event/event';

import 'boxicons';
import '../../App/style.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

  const handleLogout = () => {
    auth.logoutUser(setLoggedIn, setUserName);
  };

  return (
    <Router>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/profile" element={<UserProfile />} /> 
        <Route path="/member-list" element={<MemberList />} /> 
        <Route path="/staff-list" element={<StaffList />} /> 
        <Route path="/event" element={<EventPost />} />
      </Routes>
    </Router>
  );
}

export default App;
