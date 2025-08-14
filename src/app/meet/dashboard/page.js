"use client";

import React, { useRef, useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Button, TextField, Chip, Stack, Divider,  IconButton,
  InputAdornment, } from "@mui/material";
import MeetNav from "@/components/MeetNav";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MeetingRoom from "@/components/MeetingRoom";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { motion, AnimatePresence } from "framer-motion";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";


export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [loading, setLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Decide which view to render
  const renderView = () => {
    switch (activeTab) {
      case "schedule":
        return <ScheduleMeeting key="schedule" />;
      case "video":
        return <VideoCall key="video" />;
      case "join":
        return <JoinMeeting key="join" />;
      case "other":
        return <Groups key="other" />;
      default:
        return null;
    }
  };

  // Loader animation
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            width: 70,
            height: 70,
            backgroundColor: "#2563eb",
            borderRadius: "50%",
            boxShadow: "0px 0px 20px rgba(37,99,235,0.5)",
          }}
        />
      </Box>
    );
  }

  // Main UI
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <MeetNav activeTab={activeTab} onTabChange={setActiveTab} />

      <Box sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 2 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
/* ---- Schedule Meeting ---- */
function ScheduleMeeting() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [participants, setParticipants] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddParticipant = () => {
    if (inputValue.trim()) {
      setParticipants([...participants, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card sx={{ borderRadius: 4, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            📅 Schedule a Meeting
          </Typography>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={setDate}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ my: 2 }} />}
          />
          <TimePicker
            label="Select Time"
            value={time}
            onChange={setTime}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ my: 2 }} />}
          />
          <Stack direction="row" spacing={1} sx={{ my: 2 }}>
            {participants.map((p, i) => (
              <Chip key={i} label={p} onDelete={() => setParticipants(participants.filter((x) => x !== p))} />
            ))}
          </Stack>
          <TextField
            label="Add Participant Email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            onKeyDown={(e) => e.key === "Enter" && handleAddParticipant()}
          />
          <Button variant="contained" onClick={handleAddParticipant} sx={{ mb: 2 }}>
            Add Participant
          </Button>
          <Button variant="contained" color="primary" fullWidth>
            Schedule Meeting
          </Button>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
}

/* ---- Video Call ---- */
function VideoCall() {
  const [inCall, setInCall] = useState(false);
  const [localStream, setLocalStream] = useState(null);

  const startCall = async () => {
    try {
      // Request camera & microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      setInCall(true);

      // Here you could integrate WebRTC signalling logic (WebSocket, etc.)
    } catch (err) {
      console.error("Error accessing camera/mic:", err);
      alert("Could not access camera/microphone. Please check permissions.");
    }
  };

  // If in a call, render MeetingRoom with the local stream
  if (inCall) {
    return <MeetingRoom localStream={localStream} />;
  }

  // Otherwise render pre-call UI
  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 4,
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Box display="flex" justifyContent="center" mb={2}>
        <VideoCallIcon sx={{ fontSize: 60, color: "#2563eb" }} />
      </Box>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Start a Video Call
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Connect instantly with colleagues, friends, or clients.  
        Your video and audio will start immediately after you join.  
        Share the session link to invite others.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Button
        variant="contained"
        size="large"
        startIcon={<VideoCallIcon />}
        sx={{
          borderRadius: 3,
          px: 4,
          py: 1.5,
          textTransform: "none",
          fontSize: "1rem",
        }}
        onClick={startCall}
      >
        Start Now
      </Button>
    </Card>
  );
}


/* ---- Join Meeting ---- */
function JoinMeeting() {
  const [code, setCode] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
    } catch (err) {
      console.error("Clipboard paste failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          borderRadius: 4,
          p: 4,
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          background: "linear-gradient(145deg, #f9fafb, #ffffff)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            p: 2,
            borderRadius: "50%",
            background: "rgba(37,99,235,0.1)",
            width: 90,
            height: 90,
            margin: "0 auto",
          }}
        >
          <GroupAddIcon sx={{ fontSize: 50, color: "#2563eb", alignSelf: "center" }} />
        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontFamily: "Righteous, sans-serif", mb: 1 }}
        >
          Join a Meeting
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Enter a meeting code or link to connect instantly with your team.
        </Typography>

        <TextField
          label="Meeting Code or Link"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GroupAddIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />

        <Box display="flex" justifyContent="space-between" mb={2}>
          <IconButton onClick={handlePaste} color="primary" title="Paste from clipboard">
            <ContentPasteIcon />
          </IconButton>
          <IconButton color="primary" title="Scan QR">
            <QrCodeScannerIcon />
          </IconButton>
        </Box>

        <Button
          variant="contained"
          disabled={!code.trim()}
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Join Now
        </Button>
      </Card>
    </motion.div>
  );
}

/* ---- Other Options ---- */
function Groups() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          borderRadius: 4,
          p: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          background: "linear-gradient(145deg, #f9fafb, #ffffff)",
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <GroupIcon sx={{ fontSize: 40, color: "#2563eb", mr: 1 }} />
          <Typography variant="h5" fontWeight="bold">
            Groups
          </Typography>
        </Box>

        <Button
          fullWidth
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            mb: 2,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Create New Group
        </Button>

        <Button
          fullWidth
          startIcon={<PeopleAltIcon />}
          sx={{ mb: 2 }}
        >
          View All Groups
        </Button>

        <Button
          fullWidth
          startIcon={<ChatIcon />}
        >
          Group Chats
        </Button>
      </Card>
    </motion.div>
  );
}
