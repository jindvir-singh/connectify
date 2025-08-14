"use client";

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const LogoText = styled(Typography)({
  fontWeight: 600,
  fontSize: "1.4rem",
  color: "rgba(0, 42, 209, 0.9)",
  fontFamily: "Righteous, sans-serif",
});

export default function MeetNav({ activeTab, onTabChange }) {
  const [loggedIn, setLoggedIn] = useState(true);
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

          {/* Navigation */}
          {loggedIn && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {["schedule", "video", "join", "other"].map((tab) => (
                <Button
                  key={tab}
                  sx={{
                    fontFamily: "Righteous, sans-serif",
                    fontWeight: activeTab === tab ? "bold" : "normal",
                    borderBottom: activeTab === tab ? "2px solid rgba(0,42,209,0.9)" : "none",
                    borderRadius: 0,
                  }}
                  color="inherit"
                  onClick={() => onTabChange(tab)}
                >
                  {tab === "schedule" && "Schedule Meeting"}
                  {tab === "video" && "Video Call"}
                  {tab === "join" && "Join"}
                  {tab === "other" && "Other"}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Side */}
          {loggedIn && (
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
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem
                  onClick={() => {
                    setLoggedIn(false);
                    handleMenuClose();
                    
                  }}
                  sx={{
                    color: "red",
                    "&:hover": { backgroundColor: "rgba(255,0,0,0.15)" },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
