import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent, Footer } from '../page-components/components';
import * as auth from '../../functions/auth';
import './event.css'

function EventPost() {
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [events, setEvents] = useState([]); // Add state for events
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await fetch('http://localhost:3000/api/event'); // Fetch events data
        const eventsData = await eventsResponse.json();

        if (eventsData.docs && Array.isArray(eventsData.docs)) {
          setEvents(eventsData.docs);
        } else {
          console.error('Fetched data does not contain an array:', eventsData);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    auth.logoutUser(setLoggedIn, setUserName);
    navigate('/login');
  };

  return (
    <div className='event-list'>
      {/* nav */}
      <NavbarComponent
        isLoggedIn={isLoggedIn}
        userProfilePicture={userProfilePicture}
        userName={userName}
        handleLogout={handleLogout}
      />

      {/* Display events data */}
      <div className="events-container">
        {events.map((event) => (
          <div key={event.id}>
            <h2>{event.event}</h2>
            <p>{event.description}</p>
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default EventPost;
