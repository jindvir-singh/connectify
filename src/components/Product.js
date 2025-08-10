// components/Product.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    Button
} from "@mui/material";
import {
    Apple,
    Android,
    Language,
    CheckCircleOutline,
} from "@mui/icons-material";

const apps = [
    {
        platform: "Android App",
        icon: <Android sx={{ fontSize: 40 }} />,
        image: "android.png",
        description: "Get the full power of our app on your Android device. Fast, reliable, and secure.",
        features: [
            "HD voice and video",
            "Integrated with Google Assistant",
            "Customizable themes",
        ],
        link: "#",
    },
    {
        platform: "iOS App",
        icon: <Apple sx={{ fontSize: 40 }} />,
        image: "apple.png",
        description: "Experience our app on your iPhone. Designed for a seamless and intuitive user experience.",
        features: [
            "FaceTime-like video calls",
            "iMessage-style group chats",
            "Seamless data sync",
        ],
        link: "#",
    },
    
    {
        platform: "Web App",
        icon: <Language sx={{ fontSize: 40 }} />,
        image: "globe.svg",
        description: "No downloads needed. Access all features directly from your browser on any desktop.",
        features: [
            "Screen sharing & co-Browse",
            "Cross-platform compatibility",
            "Browser-based access",
        ],
        link: "#",
    },
];

export default function Product() {
    const theme = useTheme();
    const [hoveredCard, setHoveredCard] = useState(1); // Start with the center card hovered

    return (
        <Box sx={{ pt: 24, px: { xs: 2, sm: 4 }, maxWidth: "lg", margin: "0 auto" }}>
            <Box textAlign="center" mb={6}>
                <Typography
                    variant="h3"
                    component="h2"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: { xs: '2.5rem', md: '2.5rem' },
                        color: 'rgba(0, 0, 0, 0.9)',
                        fontFamily: "Righteous, sans-serif",

                    }}
                >
                    Available on All Your Devices
                </Typography>
                {/* <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            color: 'rgba(0, 0, 0, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            mt: 2,
            fontFamily: "Righteous, sans-serif",
          }}
        >
          Download our app for a native experience or use our powerful web app
          to connect with anyone, anywhere.
        </Typography> */}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, my: 12 }}>
                {apps.map((app, index) => (
                    <motion.div
                        key={app.platform}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(1)} // Reset to center card on mouse leave
                        animate={{
                            scale: hoveredCard === index ? 1.1 : 0.9,
                            y: hoveredCard === index ? -20 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        style={{ zIndex: hoveredCard === index ? 10 : 1 }}
                    >
                        <Card
                            sx={{
                                width: 500,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: 4,
                                boxShadow: "0 4px 24px rgb(237, 237, 237)",
                                backgroundColor: '#ffffff',
                                border: '1px solid rgb(240, 240, 240)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={app.image}
                                
                                alt={`${app.platform} screenshot`}
                                sx={{ objectFit: 'contain', marginTop: 4,}}
                            />
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                {/* <Box sx={{ color: 'primary.main', mb: 1 }}>{app.icon}</Box> */}
                                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom sx={{ fontFamily: 'Righteous, sans-serif' }}>
                                    {app.platform}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontFamily: 'Righteous, sans-serif' }}>
                                    {app.description}
                                </Typography>
                                <List dense sx={{ textAlign: 'left', px: 2 }}>
                                    {app.features.map((feature) => (
                                        <ListItem key={feature} disablePadding>
                                            <ListItemIcon sx={{ minWidth: '35px', }}>
                                                <CheckCircleOutline
                                                    color="primary"
                                                    sx={{
                                                        color: app.highlighted ? "rgba(0, 42, 209, 0.9)" : "rgba(0, 42, 209, 0.9)", marginTop: 2,
                                                    }}
                                                />                      </ListItemIcon>
                                            <ListItemText
                                                sx={{
                                                    textDecoration: 'none',
                                                    fontFamily: "Righteous, sans-serif",
                                                    marginTop: 2,
                                                }}
                                                primary={feature}
                                            />                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: "rgba(0, 42, 209, 0.9)",
                                        "&:hover": { backgroundColor: "#2563eb" },
                                        borderRadius: 4,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
                                        fontFamily: "Righteous, sans-serif",

                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Card>
                    </motion.div>
                ))}
            </Box>
        </Box>
    );
}