"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Button, Container } from "@mui/material";
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import MicIcon from "@mui/icons-material/Mic";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ScrollDownIndicator from "./ScrollDownIndicator";
import { IconButton } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
export default function Landing() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "rgba(145, 138, 138, 0)",
        color: "white",
        position: "relative",
        overflow: "hidden",

      }}
    >
      <Container maxWidth="md   " sx={{ textAlign: "center" }}>
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <Typography
            variant="h6"
            
            sx={{
              maxWidth: 580,
              mx: "auto",
              mb: 5,
              color: "rgba(0, 0, 0, 0.75)",
              lineHeight: 1.6,
              fontFamily: "Righteous, sans-serif",
            }}
          >
            Experience effortless communication — sharp video, rich audio, and seamless sharing.
          </Typography>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          <Button
            variant="contained"
            // startIcon={<VideocamRoundedIcon />}
            sx={{
              backgroundColor: "    rgba(0, 42, 209, 0.9)",
              "&:hover": { backgroundColor: "#2563eb" },
              borderRadius: 999,
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
              minHeight: "48px",
              fontFamily: "Righteous, sans-serif",

            }}
          >
            Try Demo 
          </Button>

         
        </motion.div>
        {/* Lottie Animation */}
        <ScrollDownIndicator />

      </Container>

      {/* Floating Icons */}
      <motion.div
        style={{
          position: "absolute",
          top: "18%",
          left: "20%",
          fontSize: "3rem",
          opacity: 0.15,
          color: "rgba(0, 42, 209, 0.9)",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <VideocamRoundedIcon fontSize="inherit" />
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          bottom: "18%",
          right: "20%",
          fontSize: "3rem",
          opacity: 0.15,
          color: "rgba(0, 42, 209, 0.9)",
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <MicIcon fontSize="inherit" />
      </motion.div>
    </Box>
  );
}
