// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavbarComponent from '../page-components/all-components';
import * as auth from '../../functions/auth';
import './user-profile.css';

function UserProfile() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  useEffect (() => {
    if(!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    auth.logoutUser(setLoggedIn, setUserName);
    navigate('/login');
  };

  return (
    <div className="User-Profile mt-5 pt-5">
      <NavbarComponent
        isLoggedIn={isLoggedIn}
        userProfilePicture={userProfilePicture}
        userName={userName}
        handleLogout={handleLogout}
      />

      <div className='container'>
        <div className="profile-container">
          <div className="profile-info">
            <img src={userProfilePicture} alt="" className="profile-image" />
            <div className="profile-details">
              <div className="user-name-actions">
                <h2>{userName}</h2>
                <Button variant="outline-danger" className="logout-button" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <p>Email: example@example.com</p>
              {/* Add more user details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
