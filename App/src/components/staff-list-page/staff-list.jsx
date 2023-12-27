import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent, Footer} from '../page-components/components';
import * as auth from '../../functions/auth';
import './staff-list.css'

function StaffList() {
  const [staffs, setStaffs] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffsResponse = await fetch('http://localhost:3000/api/staffs?sort=name');
        const staffsData = await staffsResponse.json();

        if (staffsData.docs && Array.isArray(staffsData.docs)) {
          setStaffs(staffsData.docs);
        } else {
          console.error('Fetched data does not contain an array:', staffsData);
        }
      } catch (error) {
        console.error('Error fetching staffs:', error);
      }
    };

    fetchData();
  }, []); 

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
    <div className='staff-list'>
      {/* nav */}
      <NavbarComponent
        isLoggedIn={isLoggedIn}
        userProfilePicture={userProfilePicture}
        userName={userName}
        handleLogout={handleLogout}
      />
      
      {/*list*/}
      <div className="container mt-5">
        <div className="d-flex flex-column align-items-center">
          <h1 className="my-5">Daftar Staff</h1>
          {staffs.map((staff) => (
            <div key={staff.id} className="col-md-6 mb-4">
              <div className="card d-flex flex-row">
                <img
                  src={`http://localhost:3000${staff.profilePicture.url}`}
                  alt={`Profil ${staff.name}`}
                  className="card-img-left ms-3 rounded-circle align-self-center"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <div className="card-body ml-3 my-0 ">
                  <div className="justify-content-between align-items-start">
                    <h5 className="card-title">{staff.name} <br /> {staff.nickname} </h5>
                    <p className="card-text mt-0 pt-0">
                      <br></br>
                      NRP: {staff.nrp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <Footer/>
    </div>
  );
}

export default StaffList;
