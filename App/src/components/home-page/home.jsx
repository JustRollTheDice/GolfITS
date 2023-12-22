import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { NavbarComponent, Footer } from '../page-components/all-components';
import { Link } from 'react-scroll';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as auth from '../../functions/auth';
import './home.css';

// Dummy data for apparel
const apparelData = [
  { id: 1, name: 'Apparel 1', image: 'path/to/image1.jpg' },
  { id: 2, name: 'Apparel 2', image: 'path/to/image2.jpg' },
  { id: 3, name: 'Apparel 3', image: 'path/to/image3.jpg' },
  // Add more apparel data as needed
];

function Home() {
  const [isLoggedIn, setLoggedIn] = React.useState(localStorage.getItem('isLoggedIn'));
  const [userName, setUserName] = React.useState(localStorage.getItem('userName'));
  const [userProfilePicture, setUserProfilePicture] = React.useState('');

  React.useEffect(() => {
    auth.fetchUserProfile(setUserProfilePicture);
  }, []);

  const handleLogout = () => {
    auth.logoutUser(setLoggedIn, setUserName);
  };

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
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
          <h1>Welcome to My Website</h1>
          <p>
            Explore our amazing features and content. Sign in to get started!
          </p>
          <Link to="collaboration" smooth={true} duration={500}>
            <Button variant="primary">Explore Collaboration</Button>
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
          {/* Add content for collaborations, such as logos, descriptions, etc. */}
        </Container>
      </div>

      {/* Apparel Section */}
      <div className="apparel-section">
        <Container>
          <h2>Explore Our Apparel</h2>
          <Slider {...sliderSettings}>
            {apparelData.map((apparel) => (
              <div key={apparel.id} className="apparel-item">
                <img src={apparel.image} alt={apparel.name} />
                <p>{apparel.name}</p>
              </div>
            ))}
          </Slider>
        </Container>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
