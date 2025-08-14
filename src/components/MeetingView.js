"use client";

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Paper, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import EventIcon from "@mui/icons-material/Event";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function MeetingView() {
  const [activeTab, setActiveTab] = useState("schedule");

  const renderContent = () => {
    switch (activeTab) {
      case "schedule":
        return <MeetingSchedule />;
      case "video":
        return <VideoCall />;
      case "join":
        return <JoinMeeting />;
      case "other":
        return <OtherOptions />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fb", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          bgcolor: "#fff",
          color: "#000",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          borderRadius: "0 0 16px 16px",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2563eb" }}>
            connectify
          </Typography>
          <Box>
            <NavButton label="SCHEDULE MEETING" active={activeTab === "schedule"} onClick={() => setActiveTab("schedule")} />
            <NavButton label="VIDEO CALL" active={activeTab === "video"} onClick={() => setActiveTab("video")} />
            <NavButton label="JOIN" active={activeTab === "join"} onClick={() => setActiveTab("join")} />
            <NavButton label="OTHER" active={activeTab === "other"} onClick={() => setActiveTab("other")} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1">John Doe</Typography>
            <Avatar sx={{ bgcolor: "#aaa" }}>J</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box sx={{ p: 4 }}>
        {renderContent()}
      </Box>
    </Box>
  );
}

/* Nav Button Component */
function NavButton({ label, active, onClick }) {
  return (
    <Button
      sx={{
        mx: 1,
        color: active ? "#2563eb" : "#333",
        fontWeight: active ? "bold" : "normal",
        borderBottom: active ? "2px solid #2563eb" : "2px solid transparent",
        borderRadius: 0,
        transition: "0.3s",
        "&:hover": { color: "#2563eb", bgcolor: "rgba(37,99,235,0.08)" },
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

/* Schedule Meeting Section */
function MeetingSchedule() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card sx={{ p: 3, borderRadius: 4, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            📅 Schedule a New Meeting
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Plan your meeting with ease. Choose date, time, and participants.
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* Video Call Section */
function VideoCall() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🎥 Start a Video Call
        </Typography>
        <Button variant="contained" startIcon={<VideoCallIcon />} sx={{ mt: 2 }}>
          Start Now
        </Button>
      </Paper>
    </motion.div>
  );
}

/* Join Meeting Section */
function JoinMeeting() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🔗 Join a Meeting
        </Typography>
        <Button variant="contained" startIcon={<GroupAddIcon />} sx={{ mt: 2 }}>
          Join with Code
        </Button>
      </Paper>
    </motion.div>
  );
}

/* Other Options Section */
function OtherOptions() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          ⚙️ Other Options
        </Typography>
        <Button variant="outlined" startIcon={<MoreHorizIcon />} sx={{ mt: 2 }}>
          Settings
        </Button>
      </Paper>
    </motion.div>
  );
}
