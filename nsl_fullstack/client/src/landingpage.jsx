import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import Auth from './authentication'; // Importing the Auth component

// Navbar with gradient and rounded bottom
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
  backgroundColor: '#FF6F61',
  color: '#fff',
  padding: '12px 30px',
  fontSize: '1.2rem',
  borderRadius: '50px',
  fontWeight: '600',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#D9A7C7',
    color: 'white',
  },
});

const FeatureSection = styled(Container)({
  padding: '50px 20px',
  backgroundColor: '#FFFBF5',
  borderRadius: '20px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  marginTop: '-60px',
});

const FeatureCard = styled(Card)({
  backgroundColor: '#f7f7f7',
  borderRadius: '15px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#FFCC00',
  },
});

const Overlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

const AboutSection = styled(Box)({
  backgroundColor: '#E8EAF6',
  padding: '60px 20px',
  borderRadius: '20px',
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
});

const AboutTitle = styled(Typography)({
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#3f51b5',
  marginBottom: '20px',
});

const AboutText = styled(Typography)({
  fontSize: '1.2rem',
  opacity: 0.8,
  lineHeight: 1.6,
  color: '#333',
  maxWidth: '800px',
  margin: '0 auto',
  marginBottom: '40px',
});

const AboutImage = styled('img')({
  maxWidth: '80%',
  borderRadius: '15px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  marginTop: '30px',
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

  const cards = [
    {
      title: 'Sign to Word Translation',
      path: '/sign-to-word',
      img: '/ok.gif', // Placeholder gif
      description: 'This feature allows you to translate sign language gestures into written words in real-time.',
    },
    {
      title: 'Word to Sign Translation',
      path: '/word-to-sign',
      img: '/sign-language-translator.gif', // Placeholder gif
      description: 'Translate written words into corresponding sign language gestures for effective communication.',
    },
    {
      title: 'Bi-Directional Communication',
      path: '/bi-directional',
      img: '/com.gif', // Placeholder gif
      description: 'Our bi-directional communication tool allows seamless exchange between sign language and spoken language.',
    },
  ];

  return (
    <div>
      <Navbar position="sticky">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', fontSize: '2rem', color: 'white' }}>
            NSL
          </Typography>
          <Button
            variant="outlined"
            style={{
              color: '#FF6F61',
              fontWeight: 'bold',
              borderRadius: '50px',
              padding: '10px 20px',
              backgroundColor: '#FFB800', // Stand-out color for the "Get Started" button
              '&:hover': {
                backgroundColor: '#FF6F61',
                color: 'white',
              },
            }}
            onClick={openForm}
          >
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
          Why Choose NSL?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <FeatureCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={card.img}
                  alt={card.title}
                />
                <CardContent>
                  <Typography variant="h6" align="center" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" paragraph>
                    {card.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </FeatureSection>

      {/* About Us Section */}
      <AboutSection>
        <AboutTitle variant="h3">About Us</AboutTitle>
        <AboutText>
          We are a passionate team committed to making communication accessible for everyone. NSL (Nepali Sign Language) is a powerful tool that helps bridge the gap between the Deaf and hearing communities. By providing real-time translation and sign language learning, we aim to make communication easier, more inclusive, and effective.
        </AboutText>
        <AboutImage src="/team-photo.jpg" alt="Our Team" />
      </AboutSection>

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
