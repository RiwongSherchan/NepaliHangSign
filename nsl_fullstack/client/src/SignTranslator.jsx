import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Container, Grid, TextField, Button, Typography, Paper, Box, CircularProgress, AppBar, Toolbar, IconButton } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';


const theme = createTheme({
  typography: {
    fontFamily: '"SF Pro Display", "Helvetica Neue", sans-serif',
    h5: {
      fontWeight: 700,
      fontSize: '2.25rem',
      color: '#fff',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#fff',
    },
  },
  palette: {
    primary: {
      main: '#ff5e5b', 
    },
    secondary: {
      main: '#4caf50', 
    },
    background: {
      default: '#f1f5f8', 
      paper: '#ffffff', 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});


const Background = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #ff5e5b, #ff8d69, #ffba7b)',
  zIndex: -1,
  animation: 'background-animation 10s ease infinite',
  '@keyframes background-animation': {
    '0%': {
      background: 'linear-gradient(135deg, #ff5e5b, #ff8d69, #ffba7b)',
    },
    '50%': {
      background: 'linear-gradient(135deg, #ffba7b, #ff8d69, #ff5e5b)',
    },
    '100%': {
      background: 'linear-gradient(135deg, #ff5e5b, #ff8d69, #ffba7b)',
    },
  },
});


const NavBar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#ff5e5b', zIndex: 10, borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          None
        </Typography>
      </Toolbar>
    </AppBar>
  );
};


function AnimationPlayer() {
  const [sentence, setSentence] = useState('');
  const [animationFrame, setAnimationFrame] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    socket.current = io('http://localhost:5001');

    socket.current.on('animation_frame', (frameBlob) => {
      const imageUrl = URL.createObjectURL(new Blob([frameBlob], { type: 'image/jpeg' }));
      setAnimationFrame(imageUrl); 
    });

    socket.current.on('animation_complete', () => {
      setIsAnimating(false);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handlePlayAnimation = async () => {
    if (sentence.trim() === '') return;

    setIsAnimating(true);
    setAnimationFrame(null); 

    try {
      const response = await fetch('http://localhost:5001/animation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence }),
      });

      if (!response.ok) {
        console.error('Failed to start animation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper elevation={15} sx={{ padding: 4, marginTop: 4, borderRadius: '20px', backgroundColor: '#fff', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 2 }}>
        Word Animation
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Type a sentence"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
        disabled={isAnimating}
        sx={{
          marginBottom: 2,
          backgroundColor: '#f9f9f9',
          borderRadius: '15px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePlayAnimation}
        disabled={isAnimating}
        fullWidth
        sx={{
          marginBottom: 2,
          borderRadius: '15px',
          padding: '12px',
          fontSize: '16px',
          textTransform: 'none',
          backgroundColor: '#ff5e5b',
          '&:hover': {
            backgroundColor: '#ff3d3a',
          },
        }}
      >
        {isAnimating ? <CircularProgress size={24} color="inherit" /> : 'Play Animation'}
      </Button>
      {animationFrame && (
        <img src={animationFrame} alt="Animation Frame" style={{
          width: '100%',
          borderRadius: '20px',
          objectFit: 'cover',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        }} />
      )}
    </Paper>
  );
}


function SignTranslator() {
  const [gesture, setGesture] = useState('');
  const [isCameraRunning, setIsCameraRunning] = useState(false);
  const videoRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    socketRef.current.on('video_frame', (frame) => {
      const imageUrl = URL.createObjectURL(new Blob([frame], { type: 'image/jpeg' }));
      if (videoRef.current) {
        videoRef.current.src = imageUrl;
      }
    });

    socketRef.current.on('gesture_prediction', (predictedGesture) => {
      setGesture(predictedGesture);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const startCamera = async () => {
    const response = await fetch('http://localhost:5000/start');
    if (response.ok) {
      setIsCameraRunning(true);
    }
  };

  const stopCamera = async () => {
    const response = await fetch('http://localhost:5000/stop');
    const data = await response.json();
    if (response.ok) {
      setIsCameraRunning(false);
      setGesture(data.predicted_word);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4, display: 'flex', justifyContent: 'center', paddingBottom: '50px' }}>
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={18} sx={{ padding: 4, borderRadius: '30px', backgroundColor: '#fff', boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Gesture Recognition
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={startCamera}
              disabled={isCameraRunning}
              fullWidth
              sx={{
                marginBottom: 2,
                borderRadius: '15px',
                padding: '12px',
                fontSize: '18px',
                backgroundColor: '#4caf50',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
              }}
            >
              Start Camera
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={stopCamera}
              disabled={!isCameraRunning}
              fullWidth
              sx={{
                marginBottom: 2,
                borderRadius: '15px',
                padding: '12px',
                fontSize: '18px',
                backgroundColor: '#ff5e5b',
                '&:hover': {
                  backgroundColor: '#ff3d3a',
                },
              }}
            >
              Stop Camera
            </Button>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: '500', color: '#333' }}>
              Predicted Gesture: {gesture || 'Waiting...'}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <img ref={videoRef} alt="Live feed" style={{ width: '100%', maxWidth: 600, borderRadius: 15 }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <AnimationPlayer />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignTranslator;
