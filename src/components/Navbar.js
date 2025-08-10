
"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const LogoText = styled(Typography)({
  fontWeight: 600,
  fontSize: "1.4rem",
  color: "rgba(0, 42, 209, 0.9)",
});

const scrollToProduct = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth',
  });
};

const scrollToPricing = () => {
  window.scrollTo({
    top: window.innerHeight * 2,
    behavior: 'smooth',
  });
};
const scrollToContact = () => {
  window.scrollTo({
    top: window.innerHeight * 3,
    behavior: 'smooth',
  });
};

export default function Navbar() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Ensure the parent box takes full width
      }}
    >
      <AppBar
        position="static"
        sx={{
          width: "75%",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          borderRadius: "12px",
          color: "#000",
          margin: "2rem",
          fontFamily: "Righteous, sans-serif",

        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={1}>
            <LogoText sx={{
              fontFamily: "Righteous, sans-serif",
            }}>connectify</LogoText>
          </Box>

          {/* Menu */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button sx={{
              fontFamily: "Righteous, sans-serif",
            }} color="rgba(255, 255, 255, 0.9)" href="/">Home</Button>
            <Button sx={{
              fontFamily: "Righteous, sans-serif",
            }} color="rgba(255, 255, 255, 0.9)" onClick={scrollToProduct}>Product</Button>

            <Button sx={{
              fontFamily: "Righteous, sans-serif",
            }} color="rgba(255, 255, 255, 0.9)" onClick={scrollToPricing}>Pricing</Button>
            <Button sx={{
              fontFamily: "Righteous, sans-serif",
            }} color="rgba(255, 255, 255, 0.9)" onClick={scrollToContact}>Contact</Button>
          </Box>

          {/* Auth buttons */}
          <Box sx={{
            display: "flex", gap: 2, fontFamily: "Righteous, sans-serif",
          }}>
            <Button sx={{
              fontFamily: "Righteous, sans-serif",
            }} color="inherit" href="/signin">Sign in</Button>
            <Button
              variant="contained"
              href="/register"
              sx={{
                fontFamily: "Righteous, sans-serif",
                backgroundColor: "rgba(0, 42, 209, 0.9)",
                "&:hover": { backgroundColor: "#6d28d9" },
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>

  );
}
