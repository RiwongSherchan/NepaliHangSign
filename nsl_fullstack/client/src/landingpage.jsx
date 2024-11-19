// LandingPage.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import Auth from './authentication';  // Importing the Auth component

const Navbar = styled(AppBar)({
  background: 'linear-gradient(135deg, #FF6F61, #D9A7C7)',
  borderRadius: '0 0 40% 40%',
  padding: '20px 50px',
});

const HeroSection = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #FF6F61, #D9A7C7)',
  color: 'white',
  height: '80vh',
  textAlign: 'center',
  borderRadius: '0 0 50% 50%',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
});

const HeroTitle = styled(Typography)({
  fontSize: '4rem',
  fontWeight: 'bold',
  marginBottom: '20px',
});

const HeroSubtitle = styled(Typography)({
  fontSize: '1.5rem',
  opacity: 0.8,
  marginBottom: '30px',
});

const CTAButton = styled(Button)({
  backgroundColor: '#fff',
  color: '#FF6F61',
  padding: '12px 30px',
  fontSize: '1.2rem',
  borderRadius: '50px',
  fontWeight: '600',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#FF6F61',
    color: 'white',
  },
});

const FeatureSection = styled(Container)({
  padding: '50px 20px',
  backgroundColor: '#fff',
  borderRadius: '20px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  marginTop: '-60px',
});

const FeatureCard = styled(Card)({
  backgroundColor: '#f7f7f7',
  borderRadius: '15px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const Footer = styled(Box)({
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px 0',
  textAlign: 'center',
  marginTop: '40px',
});

// Slide-over Form Styles
const Overlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken background when form is visible
  zIndex: 999,
});

const SlideOverForm = styled(Box)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '500px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  padding: '30px',
  borderRadius: '10px',
  transition: 'transform 0.5s ease',
  zIndex: 1000,
  opacity: 0,
  visibility: 'hidden',
  height: 'auto',
  '@media (max-width: 600px)': {
    width: '80%',
    padding: '20px',
  },
});

function LandingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <Navbar position="sticky">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', fontSize: '2rem', color: 'white' }}>
            SignEase
          </Typography>
          <Button variant="outlined" style={{ color: '#FF6F61', fontWeight: 'bold', borderRadius: '50px', padding: '10px 20px' }} onClick={openForm}>
            Get Started
          </Button>
        </Toolbar>
      </Navbar>

      <HeroSection>
        <HeroTitle variant="h1">Bridging Communication Gaps</HeroTitle>
        <HeroSubtitle variant="h5">Real-time Bi-Directional Sign Language Interpretation</HeroSubtitle>
        <CTAButton variant="contained" component={Link} to="/sign-translator">
          Sign Translator
        </CTAButton>
      </HeroSection>

      <FeatureSection>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose SignEase?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <CardContent>
                <img src="https://www.example.com/feature-icon.png" alt="AI Translation" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
                <Typography variant="h6" align="center" gutterBottom>
                  AI-Powered Translations
                </Typography>
                <Typography variant="body1" align="center">
                  Leverage cutting-edge AI for fast and accurate sign language translations.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <CardContent>
                <img src="https://www.example.com/feature-icon.png" alt="Video Integration" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
                <Typography variant="h6" align="center" gutterBottom>
                  Seamless Video Integration
                </Typography>
                <Typography variant="body1" align="center">
                  High-quality video streaming for clear communication and better user experience.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard>
              <CardContent>
                <img src="https://www.example.com/feature-icon.png" alt="Accessibility" style={{ width: '80px', height: '80px', marginBottom: '20px' }} />
                <Typography variant="h6" align="center" gutterBottom>
                  Accessible for Everyone
                </Typography>
                <Typography variant="body1" align="center">
                  Designed with inclusivity in mind, making communication easy for all.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </FeatureSection>

      <Footer>
        <Typography variant="body2">
          © 2024 SignEase. Crafted with ♥ for accessibility.
        </Typography>
      </Footer>

      {isFormOpen && (
        <>
          <Overlay onClick={closeForm} />
          <SlideOverForm style={{ opacity: 1, visibility: 'visible' }}>
            <Auth isLogin={isLogin} toggleForm={toggleForm} closeForm={closeForm} />
          </SlideOverForm>
        </>
      )}
    </div>
  );
}

export default LandingPage;
