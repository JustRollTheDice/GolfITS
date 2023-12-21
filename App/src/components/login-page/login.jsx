import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { NavbarComponent } from '../page-components/all-components';
import './login.css';
import { checkLoggedInStatus, loginUser } from '../../functions/auth';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login';
    checkLoggedInStatus(setLoggedIn, setUserName);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [userType, setUserType] = useState('staff');

  useEffect(() => {
    if (isLoggedIn) {
      setShowWelcome(true);
      const timeoutId = setTimeout(() => {
        setShowWelcome(false);
        navigate('/home');
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    loginUser(userType, email, password, setEmail, setPassword, setLoggedIn, setUserName);
  };

  return (
    <div className="Login">

      {/* Navbar */}
      <NavbarComponent isLoggedIn={isLoggedIn} userName={userName} />
      
      {/* Form */}
      <div className="container custom-login-form">
        <div className='text-center mb-4'>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className='input-box'>
            <input
              type="text"
              placeholder='Email'
              className="form-control"
              id="email-form"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="icon-wrapper">
              <box-icon name='at' color='#808080'></box-icon>
            </div>
          </div>
          <div className='my-3 input-box'>
            <input
              type="password"
              placeholder='Password'
              className="form-control"
              id="password-form"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="icon-wrapper">
              <box-icon type='solid' name='lock-alt' color='#808080'></box-icon>
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="user-type" className="form-label">
              Login As:
            </label>
            <select
              id="user-type"
              className="form-select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="staff">Staff</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div className='d-flex justify-content-center'>
            <Button
              className='btn-login'
              type="submit"
              variant="success"
            >
              Login
            </Button>
          </div>
        </form>
        {showWelcome && (
          <div className="floating-object text-center d-flex">
            <h2 className="my-auto mx-auto">Welcome <br></br>{userName}!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
