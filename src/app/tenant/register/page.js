"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Navbar from '@/components/Navbar'; // Adjust path to your Navbar component
import RegistrationStepper from '@/components/RegistrationStepper'; // Adjust path

export default function RegisterPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Navbar />
      <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        <RegistrationStepper />
      </Box>
    </Box>
  );
}