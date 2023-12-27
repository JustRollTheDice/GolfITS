import React from 'react';
import { Container, Row, Col, Button, Card} from 'react-bootstrap';
import { NavbarComponent, Footer } from '../page-components/components';
import { Link } from 'react-scroll';
import * as auth from '../../functions/auth';
import Logo from '../../assets/logos/hero.svg';
import ArrowDown from '../../assets/design/arrowdown.svg';
import BdgLogo from '../../assets/logos/collab/bdg-logo.png';
import BriLogo from '../../assets/logos/collab/bri-logo.png';
import KahfLogo from '../../assets/logos/collab/kahf-logo.png';

import './home.css';

function Home() {
  const [apparelData, setApparelData] = React.useState([]);
  const [isLoggedIn, setLoggedIn] = React.useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = React.useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = React.useState('');

  React.useEffect(() => {
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  // Hero paralax
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY / 5;
      const heroSection = document.querySelector('.custom-hero');
      const img = document.querySelector('.custom-hero img');
      const title = document.querySelector('.custom-hero h1');
      const description = document.querySelector('.custom-hero p');
      const button = document.querySelector('.custom-hero button');

      if (heroSection && img && title && description && button) {
        const translate = scrollY;
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

  React.useEffect(() => {
    const fetchApparelData = async () => {
      try {
        const apparelResponse = await fetch('http://localhost:3000/api/apparel');
        const apparelData = await apparelResponse.json();

        if (apparelData.docs && Array.isArray(apparelData.docs)) {
          setApparelData(apparelData.docs);
        } else {
          console.error('Fetched apparel data is not an array:', apparelData);
        }
      } catch (error) {
        console.error('Error fetching apparel data:', error);
      }
    };

    fetchApparelData();
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
                <Link to="apparel" smooth={true} duration={500}>
                  <Button variant="primary">Learn More</Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Link to="apparel" smooth={true} duration={700} className="arrow-link">
            <img src={ArrowDown} alt="Arrow" className="arrowdown" />
          </Link>
        </Container>
      </div>

      <div id="apparel" className="apparel-section">
        <Container>
          <Row>
            {/* Bagian teks di sebelah kiri */}
            <Col md={4} className='d-flex align-items-center'>
              <div className="apparel-text">
                <h1 className='my-0 py-0'>Golf</h1>
                <h1 className='my-0 py-0'>Apparel.</h1>
                <p className=''>Checkout our latest apparel</p>
              </div>
            </Col>
            <Col md={8}>
              <Row>
                {/* Display apparel cards */}
                {apparelData.map((item) => (
                  <Col key={item.id}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={`http://localhost:3000${item.apparelImage.url}`}
                        className='card-img'
                      />
                      <Card.Body>
                        <Card.Title>{item.apparel}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text>Rp{item.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Collaboration Section */}
      <div id="collaboration" className="collaboration-section">
        <Container>
          <h2>Our Partnership</h2>
          <p>Discover our partnerships with various organizations and individuals that make our platform special.</p>
          <Row className='collaboration-logo-container-row'>
            <Col className="collaboration-logo-container">
              <img src={BdgLogo} alt="Bukit Darmo Golf" className="collaboration-logo" />
            </Col>
            <Col className="collaboration-logo-container">
              <img src={BriLogo} alt="Bank Rakyat Indonesia" className="collaboration-logo" />
            </Col>
            <Col className="collaboration-logo-container">
              <img src={KahfLogo} alt="Kahf" className="collaboration-logo" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
