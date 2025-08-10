// components/Footer.jsx
"use client";

import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  Room,
} from "@mui/icons-material";

const Footer = () => {
  const fontStyle = {
    fontFamily: "Righteous, sans-serif",
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 42, 209, 0.9)",
        color: "#fff",
        py: 4,
        mt: 6,
        px: { xs: 2, md: 4 },
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="h5" sx={{ ...fontStyle, mb: 1 }}>
              Connectify
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 300, mx: { xs: "auto", md: "0" } }}>
              Connectify provides seamless video and voice communication for
              teams of all sizes.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4} ml={-16}>
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="h5" sx={{ ...fontStyle, mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', mb: 1 }}>
              <Room sx={{ mr: 1 }} />
              <Typography variant="body2">
                Punjab, India
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Link href="mailto:help@connectify.com" color="inherit" underline="hover">
                <Typography variant="body2">help@connectify.com</Typography>
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">+91 12345 67890</Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
            <Typography variant="h5" sx={{ ...fontStyle, mb: 2 }}>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" underline="hover" display="block">
              <Typography variant="body2">Home</Typography>
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              <Typography variant="body2">Features</Typography>
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              <Typography variant="body2">Pricing</Typography>
            </Link>
            <Link href="#" color="inherit" underline="hover" display="block">
              <Typography variant="body2">Support</Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="body2" color="inherit" sx={{ ...fontStyle }}>
          &copy; {new Date().getFullYear()} Connectify. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;