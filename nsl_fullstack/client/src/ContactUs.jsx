import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const ContactUs = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dummy form submission:', formData); 
    alert(`Message sent! (Dummy)\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: '', email: '', message: '' });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="contact-us-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #FF6F61',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px',
        }}
      >
        <Typography
          id="contact-us-modal"
          variant="h6"
          component="h2"
          sx={{ mb: 2, textAlign: 'center', color: '#FF6F61' }}
        >
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: '20px',
              backgroundColor: '#FF6F61',
              color: 'white',
              '&:hover': {
                backgroundColor: '#FF4B47',
              },
            }}
          >
            Send
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ContactUs;
