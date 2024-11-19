import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogActions, DialogContent } from '@mui/material';
import { styled } from '@mui/system';
import ContactUs from './ContactUs';


const Navbar = styled(AppBar)({
  background: 'linear-gradient(135deg, #FF6F61, #D9A7C7)',
  borderRadius: '0 0 40% 40%',
  padding: '20px 50px',
});

const LearnSignLanguage = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [isContactOpen, setIsContactOpen] = useState(false); 

  useEffect(() => {
  
    fetch('http://localhost:3005/api/videos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        return response.json();
      })
      .then((data) => {
        setVideos(data); 
      })
      .catch((err) => {
        setError('Error fetching videos: ' + err.message);
      });
  }, []);

 
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

 
  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div style={{ backgroundColor: '#FFF9E5', minHeight: '100vh' }}>
 
      <Navbar position="sticky">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.location.href = '/dashboard'}>
            <img
              src="NSL-logo.png"
              alt="NSL Logo"
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
            <Typography
              variant="h6"
              style={{
                fontWeight: 'bold',
                fontSize: '1.8rem',
                color: 'white',
              }}
            >
              NSL School
            </Typography>
          </Box>

         
          <Box sx={{ display: 'flex', gap: '20px', flexGrow: 1, justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FFB800', // Same color as the Profile Settings button
                color: '#fff',
                borderRadius: '20px',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: '#FFD700',
                  boxShadow: '0 0 10px 5px rgba(255, 215, 0, 0.6)',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => (window.location.href = '/sign-translator')}
            >
              NSL Sign Translator
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FFB800', // Same color as the Profile Settings button
                color: '#fff',
                borderRadius: '20px',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: '#FFD700',
                  boxShadow: '0 0 10px 5px rgba(255, 215, 0, 0.6)',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => setIsContactOpen(true)} // Open the Contact Us modal
            >
              Contact Us
            </Button>
          </Box>

          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#008000', // Green color for logout
                color: '#fff',
                borderRadius: '20px',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: '#006400',
                  boxShadow: '0 0 10px 5px rgba(0, 128, 0, 0.6)',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => {
                Cookies.remove('user_id'); // Delete the user ID cookie
                window.location.href = '/'; // Redirect to home page
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Navbar>

    
      <ContactUs open={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <Box sx={{ padding: '30px', borderRadius: '8px', marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Welcome to NSL School
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          Explore and learn Nepali Sign Language in an interactive way.
        </Typography>
      </Box>

   
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index}>
              <button
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#FFB800',
                  color: '#fff',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '10px',
                }}
                onClick={() => handleVideoClick(video)} // Show video on click
              >
                {video.replace('.mp4', '')}
              </button>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>

   
      <Dialog open={selectedVideo !== null} onClose={closeVideoPlayer}>
        <DialogContent>
          {selectedVideo && (
            <video
              controls
              style={{ width: '100%', height: 'auto' }}
              src={`http://localhost:3005/${selectedVideo}`}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeVideoPlayer} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LearnSignLanguage;
