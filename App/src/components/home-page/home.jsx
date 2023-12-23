import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NavbarComponent, Footer } from '../page-components/all-components';
import { Link } from 'react-scroll';
import * as auth from '../../functions/auth';
import Logo from '../../assets/logos/hero.svg'; // Import your SVG logo here
import ArrowDown from '../../assets/design/arrowdown.svg'
import './home.css';

function Home() {
  const [isLoggedIn, setLoggedIn] = React.useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = React.useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = React.useState('');

  React.useEffect(() => {
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  // Hero paralax
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSection = document.querySelector('.custom-hero');
      const img = document.querySelector('.custom-hero img');
      const title = document.querySelector('.custom-hero h1');
      const description = document.querySelector('.custom-hero p');
      const button = document.querySelector('.custom-hero button');
  
      if (heroSection && img && title && description && button) {
        const translate = scrollY / 4; 
        img.style.transform = `translate(0, -${translate}px)`;
        title.style.transform = `translate(0, -${translate}px)`;
        description.style.transform = `translate(0, -${translate}px)`;
        button.style.transform = `translate(0, -${translate}px)`;
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

      {/* Hero Section */}
      <div className="custom-hero">
        <Container>
          <Row>
            <Col md={5} className='d-flex justify-content-center'>
              <img src={Logo} alt="My Logo" className="img-fluid" />
            </Col>
            <Col md={7} className='d-flex align-items-center'>
              <div>
                <h1>Golf ITS</h1>
                <p>Explore our amazing features and content. Sign in to get started!</p>
                <Link to="collaboration" smooth={true} duration={500}>
                  <Button variant="primary">Explore Collaboration</Button>
                </Link>
              </div>
            </Col>
          </Row>
          {/* Arrow Link to Next Section */}
          <Link to="collaboration" smooth={true} duration={700} className="arrow-link">
            <img src={ArrowDown} alt="Arrow" className="arrowdown" />
          </Link>

        </Container>
      </div>

      {/* Collaboration Section */}
      <div id="collaboration" className="collaboration-section">
        <Container>
          <h2>Our Collaborations</h2>
          <p>
            Discover our partnerships with various organizations and individuals
            that make our platform special.
          </p>
        </Container>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
