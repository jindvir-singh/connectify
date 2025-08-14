"use client";

import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import MeetNav from "@/components/MeetNav";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("schedule");

  const renderView = () => {
    switch (activeTab) {
      case "schedule":
        return <CardView title="📅 Schedule a Meeting" desc="Choose date, time, and participants." />;
      case "video":
        return <CardView title="🎥 Start a Video Call" desc="Launch a secure video session instantly." />;
      case "join":
        return <CardView title="🔗 Join a Meeting" desc="Enter a meeting code or link to join." />;
      case "other":
        return <CardView title="⚙️ Other Options" desc="View settings and additional tools." />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <MeetNav activeTab={activeTab} onTabChange={setActiveTab} />
      <Box sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 2 }}>
        {renderView()}
      </Box>
    </Box>
  );
}

function CardView({ title, desc }) {
  return (
    <Card sx={{ borderRadius: 4, p: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {desc}
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
