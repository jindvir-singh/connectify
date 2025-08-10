    "use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const LogoText = styled(Typography)({
  fontWeight: 600,
  fontSize: "1.4rem",
  color: "rgba(0, 42, 209, 0.9)",
  fontFamily: "Righteous, sans-serif",
});

export default function MeetNav() {
  const [loggedIn, setLoggedIn] = useState(true); // Simulate logged-in state
  const [username] = useState("John Doe");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%">
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
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={1}>
            <LogoText>connectify</LogoText>
          </Box>

          {/* Logged-in navigation */}
          {loggedIn ? (
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button sx={{ fontFamily: "Righteous, sans-serif" }} color="inherit">
                Schedule Meeting
              </Button>
              <Button sx={{ fontFamily: "Righteous, sans-serif" }} color="inherit">
                Video Call
              </Button>
              <Button sx={{ fontFamily: "Righteous, sans-serif" }} color="inherit">
                Join
              </Button>
              <Button sx={{ fontFamily: "Righteous, sans-serif" }} color="inherit">
                Other
              </Button>
            </Box>
          ) : (
            // Show original menu if not logged in
            <Box sx={{ display: "flex", gap: 3 }}>
              <Button sx={{ fontFamily: "Righteous, sans-serif" }} color="inherit">
                Home
              </Button>
              <Button sx={{ fontFamily: "Righteous, sans-serif" }} color="inherit">
                Product
              </Button>
              <Button sx={{ fontFamily: "Righteous, sans-serif" }} color="inherit">
                Pricing
              </Button>
              <Button sx={{ fontFamily: "Righteous, sans-serif" }} color="inherit">
                Contact
              </Button>
            </Box>
          )}

          {/* Right side - username & avatar if logged in */}
          {loggedIn ? (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                sx={{
                  fontFamily: "Righteous, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {username}
              </Typography>
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar alt={username} src="/profile.jpg" />
              </IconButton>
              <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
  PaperProps={{
    sx: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(12px)",
      borderRadius: "12px",
      boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
      border: "1px solid rgba(255, 255, 255, 0.25)",
      mt: 1.5,
      minWidth: 160,
      fontFamily: "Righteous, sans-serif",
      color: "#000",
    },
  }}
>
  <MenuItem
    onClick={handleMenuClose}
    sx={{
      "&:hover": {
        backgroundColor: "rgba(0, 42, 209, 0.15)",
      },
    }}
  >
    Profile
  </MenuItem>
  <MenuItem
    onClick={handleMenuClose}
    sx={{
      "&:hover": {
        backgroundColor: "rgba(0, 42, 209, 0.15)",
      },
    }}
  >
    Settings
  </MenuItem>
  <MenuItem
    onClick={() => {
      setLoggedIn(false);
      handleMenuClose();
    }}
    sx={{
      color: "red",
      "&:hover": {
        backgroundColor: "rgba(255, 0, 0, 0.15)",
      },
    }}
  >
    Logout
  </MenuItem>
</Menu>

            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button sx={{ fontFamily: "Righteous, sans-serif" }} color="inherit">
                Already User?
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Righteous, sans-serif",
                  backgroundColor: "rgba(0, 42, 209, 0.9)",
                  "&:hover": { backgroundColor: "#6d28d9" },
                }}
              >
                Get Started
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
