import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Card, CardContent, CardActions } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Cookies from 'js-cookie'; 
import axios from 'axios'; 

const ProfileSettings = ({ open, onClose, onDeleteAccount }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    password: '',
  });

  const [isEmailEditable, setEmailEditable] = useState(false);
  const [isPasswordEditable, setPasswordEditable] = useState(false);

  // Fetch user profile using user_id from cookies
  const fetchUserProfile = async () => {
    const userId = Cookies.get('user_id');  
    if (!userId) {
      console.error('No user_id found in cookies');
      return;  
    }
  
    try {
      const response = await axios.get('http://localhost:3005/api/profile', {
        withCredentials: true,  // To include cookies in the request
      });
  
      if (response.data.user) {
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          gender: response.data.user.gender,
          password: '',  
        });
      } else {
        console.error('No user data found in response');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  

  useEffect(() => {
    if (open) {
      fetchUserProfile();  // Fetch user profile when the modal opens
    }
  }, [open]);  // Re-run on modal open

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const userId = Cookies.get('user_id');
    if (!userId) {
      console.error('No user_id found in cookies');
      return;
    }
  
    try {
      const response = await axios.put(
        'http://localhost:3005/api/profile',
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
  
      console.log('Profile updated successfully:', response.data);
      onClose(); 
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };
  

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      onDeleteAccount();
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="profile-settings-title">
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 5, p: 4 }}>
        <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
          <CardContent>
            <Typography variant="h5" align="center" sx={{ color: '#333', fontWeight: 'bold', marginBottom: 3 }}>
              Profile Settings
            </Typography>

          
            <Box display="flex" alignItems="center" mb={2}>
              <PersonIcon sx={{ mr: 2, color: '#333' }} />
              <TextField
                label="Name"
                value={formData.name}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Box>

       
            <Box display="flex" alignItems="center" mb={2}>
              <WcIcon sx={{ mr: 2, color: '#333' }} />
              <TextField
                label="Gender"
                value={formData.gender}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Box>

          
            <Box display="flex" alignItems="center" mb={2}>
              <EmailIcon sx={{ mr: 2, color: '#333' }} />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{ readOnly: !isEmailEditable }}
                fullWidth
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => setEmailEditable((prev) => !prev)}
              >
                {isEmailEditable ? 'Done' : 'Change'}
              </Button>
            </Box>

         
            <Box display="flex" alignItems="center" mb={2}>
              <LockIcon sx={{ mr: 2, color: '#333' }} />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{ readOnly: !isPasswordEditable }}
                fullWidth
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => setPasswordEditable((prev) => !prev)}
              >
                {isPasswordEditable ? 'Done' : 'Change'}
              </Button>
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: 'space-between', mt: 3 }}>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteAccount}>
              Delete Account
            </Button>
            <Box>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" startIcon={<CancelIcon />} onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default ProfileSettings;
