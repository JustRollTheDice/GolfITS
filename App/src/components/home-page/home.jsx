import React, { useState, useEffect } from 'react';
import { NavbarComponent, Footer} from '../page-components/all-components';
import * as auth from '../../functions/auth';
import './home.css';

function Home() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = useState('');

  useEffect(() => {
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  const handleLogout = () => {
    auth.logoutUser(setLoggedIn, setUserName);
  };

  return (
    <div className="home">
      <NavbarComponent
        isLoggedIn={isLoggedIn}
        userProfilePicture={userProfilePicture}
        userName={userName}
        handleLogout={handleLogout}
      />

      {/* Body */}

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default Home;
