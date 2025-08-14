"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Avatar, Stack, Divider } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";

export default function StartVideoCall() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [participants, setParticipants] = useState(3);

  // Simulated video preview background (replace with actual <video> later)
  useEffect(() => {
    // In a real app, initialize getUserMedia here
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#0f172a",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      {/* Video Preview Section */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: camOn
            ? "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?fit=crop&w=1200&q=80')"
            : "linear-gradient(135deg, #1e293b, #334155)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Overlay for Meeting Info */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "rgba(0,0,0,0.6)",
            p: 2,
            borderRadius: 3,
            color: "white",
          }}
        >
          <Typography variant="subtitle1">Meeting ID: 839-122-448</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LockIcon fontSize="small" />
            <Typography variant="caption">End-to-end encrypted</Typography>
          </Stack>
        </Box>

        {/* Overlay for Participants */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(0,0,0,0.6)",
            p: 1.5,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PeopleIcon sx={{ color: "white" }} />
          <Typography variant="caption" sx={{ ml: 0.5, color: "white" }}>
            {participants}
          </Typography>
        </Box>

        {/* Bottom Controls */}
        <Stack
          direction="row"
          spacing={3}
          sx={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.4)",
            borderRadius: "50px",
            px: 3,
            py: 1.5,
          }}
        >
          <Button
            onClick={() => setMicOn(!micOn)}
            variant="contained"
            sx={{
              borderRadius: "50%",
              minWidth: 56,
              height: 56,
              bgcolor: micOn ? "#16a34a" : "#dc2626",
            }}
          >
            {micOn ? <MicIcon /> : <MicOffIcon />}
          </Button>
          <Button
            onClick={() => setCamOn(!camOn)}
            variant="contained"
            sx={{
              borderRadius: "50%",
              minWidth: 56,
              height: 56,
              bgcolor: camOn ? "#16a34a" : "#dc2626",
            }}
          >
            {camOn ? <VideocamIcon /> : <VideocamOffIcon />}
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "50px",
              px: 4,
              height: 56,
              bgcolor: "#2563eb",
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
            startIcon={<VideoCallIcon />}
          >
            Join Now
          </Button>
        </Stack>
      </Box>

      {/* Meeting Details Section */}
      <Box sx={{ bgcolor: "white", p: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Design Review - Sprint 12
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Hosted by Jane Doe | Today at 3:00 PM
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2}>
          <Avatar src="https://randomuser.me/api/portraits/women/1.jpg" />
          <Avatar src="https://randomuser.me/api/portraits/men/2.jpg" />
          <Avatar src="https://randomuser.me/api/portraits/women/3.jpg" />
          <Avatar sx={{ bgcolor: "#2563eb" }}>+5</Avatar>
        </Stack>
      </Box>
    </Box>
  );
}
