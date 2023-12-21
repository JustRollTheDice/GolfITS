import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent, Footer} from '../page-components/all-components';
import * as auth from '../../functions/auth';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await fetch('http://localhost:3000/api/members?sort=name');
        const membersData = await membersResponse.json();

        if (membersData.docs && Array.isArray(membersData.docs)) {
          setMembers(membersData.docs);
        } else {
          console.error('Fetched data does not contain an array:', membersData);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
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
    <div className='member-list'>
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
          <h1 className="my-5">Daftar Member</h1>
          {members.map((member) => (
            <div key={member.id} className="col-md-6 mb-4">
              <div className="card d-flex flex-row">
                <img
                  src={`http://localhost:3000${member.profilePicture.url}`}
                  alt={`Profil ${member.name}`}
                  className="card-img-left ms-3 rounded-circle align-self-center"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <div className="card-body ml-3 my-0 ">
                  <div className="justify-content-between align-items-start">
                    <h5 className="card-title">{member.name} <br /> {member.nickname} </h5>
                    <p className="card-text mt-0 pt-0">
                      <br></br>
                      NRP: {member.nrp}
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

export default MemberList;
