// components/ScrollDownIndicator.jsx

"use client";

import { useEffect, useState } from 'react';
import { Box, IconButton, GlobalStyles } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const ScrollDownIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  // The CSS containing the keyframes
  const animationStyles = `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
  `;

  return (
    <>
      <GlobalStyles styles={animationStyles} />
      <Box
        sx={{
          position: 'fixed',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
        }}
      >
        <IconButton
          onClick={handleClick}
          sx={{
            backgroundColor: "rgba(0, 42, 209, 0.9)",
            "&:hover": { backgroundColor: "#2563eb" },
            borderRadius: 4,
            minHeight: "48px",
            width: "48px",
            boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
            animation: 'bounce 2s infinite', // This now references the global keyframes
          }}
        >
          <KeyboardDoubleArrowDownIcon
            sx={{
              color: "#fff",
              fontSize: "2rem",
            }}
          />
        </IconButton>
      </Box>
    </>
  );
};

export default ScrollDownIndicator;