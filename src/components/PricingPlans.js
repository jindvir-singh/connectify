"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircleOutline } from "@mui/icons-material";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import {
    Box,
    Typography,
    Grid,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
    useTheme,
} from "@mui/material";

const plans = [
    {
        name: "Starter",
        price: "$15",
        description: "Essential tools for small teams.",
        features: [
            "1:1 & group chat",
            "File sharing",
            "Voice & video calls",
            "Screen sharing",
            "Basic co-Browse",
            "Email support",
        ],
        buttonText: "Get Started",
        highlighted: false,
    },
    {
        name: "Business",
        price: "$35",
        description: "Advanced collaboration for growing teams.",
        features: [
            "Unlimited messaging",
            "HD video meetings",
            "Interactive co-browse",
            "Call recording",
            "CRM integrations",
            "Priority support",
        ],
        buttonText: "Upgrade to Business",
        highlighted: true,
    },
    {
        name: "Enterprise",
        price: "Custom Pricing",
        description: "Secure, scalable communication for enterprises.",
        features: [
            "Unlimited participants",
            "Custom integrations",
            "Role-based access",
            "AI transcription",
            "Dedicated manager",
            "24/7 support",
        ],
        buttonText: "Contact Sales",
        highlighted: false,
    },
];

export default function Pricing() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 3, md: 4 },
                maxWidth: "auto",
                margin: "0 auto",
            }}
        >
            <Box textAlign="center" width={'100%'} mb={0}>
                <Typography
                    variant="h3"
                    component="h2"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                        color: 'rgba(0, 0, 0, 0.9)',
                        fontSize: { xs: '2.5rem', md: '2.5rem' },
                        fontFamily: "Righteous, sans-serif",

                    }}
                >
                    Our Pricing Plans
                </Typography>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                        fontFamily: "Righteous, sans-serif",

                        color: 'rgba(0, 0, 0, 0.7)',
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        maxWidth: 'auto',
                        margin: '0 auto',
                        mt: 2

                    }}
                >
                    Choose the plan that's perfect for your team. Our flexible options scale with your needs.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <DotLottieReact
                    src="https://lottie.host/619477e2-86bd-4fc2-af3e-16e33b75e6c0/sKmQCGVQVE.lottie"
                    loop
                    autoplay
                    height={100}
                />
            </Box>

            <Grid container spacing={8} justifyContent="center" alignItems="stretch">
                {plans.map((plan) => (
                    <Grid item key={plan.name} xs={12} sm={6} md={4}>
                        <motion.div whileHover={{ scale: 1.04 }}>
                            <Card
                                sx={{
                                    padding: 1.5,
                                    height: "100%",
                                    width: "400px",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 4,
                                    backgroundColor: plan.highlighted
                                        ? "#ffffff"
                                        : "#ffffff",
                                    boxShadow: plan.highlighted
                                        ? "0 4px 24px rgb(237, 237, 237)"
                                        : "0 4px 24px rgb(237, 237, 237)",
                                    transition: 'box-shadow 0.3s',
                                    border: plan.highlighted
                                        ? "2px solid rgba(255, 82, 24, 0)"
                                        : "1px solid rgb(240, 240, 240)",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        gutterBottom
                                        sx={{
                                            fontFamily: "Righteous, sans-serif",
                                            color: plan.highlighted ? "#000" : "rgba(0, 0, 0, 0.87)"
                                        }}
                                    >
                                        {plan.name}
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        color="primary"
                                        sx={{
                                            fontFamily: "Righteous, sans-serif",

                                            color: plan.highlighted ? "rgba(0, 42, 209, 0.9)" : "rgba(0, 42, 209, 0.9)",
                                            mb: 2
                                        }}
                                    >
                                        {plan.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        fontFamily: "Righteous, sans-serif",
                                        mb: 2
                                    }}>
                                        {plan.description}
                                    </Typography>
                                    <List dense>
                                        {plan.features.map((feature) => (
                                            <ListItem key={feature} disablePadding>
                                                <ListItemIcon sx={{ minWidth: '35px' }}>
                                                    <CheckCircleOutline
                                                        color="primary"
                                                        sx={{
                                                            color: plan.highlighted ? "rgba(0, 42, 209, 0.9)" : "rgba(0, 42, 209, 0.9)", marginTop: 2,
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    sx={{
                                                        textDecoration: 'none',
                                                        fontFamily: "Righteous, sans-serif",
                                                        marginTop: 2,
                                                    }}
                                                    primary={feature}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                                <Box sx={{ flexGrow: 1 }} />
                                <Box sx={{ p: 2, pt: 0 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            fontFamily: "Righteous, sans-serif",
                                            mt: 2,
                                            backgroundColor: "rgba(0, 42, 209, 0.9)",
                                            "&:hover": {
                                                backgroundColor: plan.highlighted ? "#2563eb" : "rgba(255, 82, 24, 0.7)",
                                            },
                                            borderRadius: 4,
                                            px: 4,
                                            py: 1.5,
                                            fontSize: "1rem",
                                            fontWeight: 600,
                                            textTransform: "none",
                                        }}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </Box>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}