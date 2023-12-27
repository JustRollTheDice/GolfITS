import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../public/logo.svg';
import './components.css';

export function NavbarComponent({ isLoggedIn, userProfilePicture, userName, handleLogout }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Navbar expand="lg" className="d-flex align-items-center px-5" fixed="top">
      <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
        <img src={Logo} alt="Golf ITS" width="45" height="45" className="d-inline-block align-text-center mx-2" />
        <span className='mt-1'>
          Golf ITS
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {isLoggedIn && (
            <NavDropdown title="Other" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/member-list">Member List</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/staff-list">Staff List</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
        <Nav className="ms-2">
          <Nav.Link as={Link} to="/member-list">Events</Nav.Link>
          <Nav.Link as={Link} to="/member-list">News</Nav.Link>
          <Nav.Link as={Link} to="/member-list">About Us</Nav.Link>
        </Nav>
        <Nav className="ms-2">
          {isLoginPage ? (
            // Tidak tampilkan apapun di halaman login
            null
          ) : isLoggedIn ? (
            // Tampilkan profil jika user sudah login di halaman lain
            <NavDropdown title={<><img src={userProfilePicture} alt="" className="user-profile-image me-2" />{userName}</>} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            // Tampilkan tombol login jika user belum login di halaman lain
            <Nav.Item>
              <Button as={Link} to="/login" variant="outline-success">Login</Button>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export function Footer() {
  return (
    <footer className="footer py-3">
      <div className="container text-center">
        {/* Footer Content */}
        <p>Copyright &copy; 2023 Team PMO. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default NavbarComponent;
