"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Navbar from '@/components/Navbar'; // Adjust path to your Navbar component
import RegistrationStepper from '@/components/RegistrationStepper'; // Adjust path
import MeetNav from '@/components/MeetNav';

export default function RegisterPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <MeetNav />
      <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        <RegistrationStepper />
      </Box>
    </Box>
  );
}