import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Stack,
  CssBaseline,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function MeetLogin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const LogoText = styled(Typography)({
    fontWeight: 600,
    fontSize: "1.4rem",
    color: "rgba(0, 42, 209, 0.9)",
  });
  return (
    <Box
      sx={{
        fontFamily: "Righteous, sans-serif",
        minHeight: "100vh",
        backgroundColor: "rgba(231, 236, 255, 0.74)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <CssBaseline />
      {!loggedIn ? (
        <Card
          sx={{
            borderRadius: 4,
            width: "100%",
            maxWidth: 380,
            boxShadow: "0 4px 30px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
          <LogoText sx={{
            textAlign: "center",
            mb: 2,
              fontFamily: "Righteous, sans-serif",
            }}>connectify</LogoText>

            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              mb={3}
              sx={{ fontFamily: "Righteous, sans-serif" }}
            >
              Hey, Enter your details to get sign in to your account
            </Typography>

            <TextField
              placeholder="Enter Email / Phone No"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                "& fieldset": { borderRadius: "12px" },
                backgroundColor: "#fff",
              }}
            />
            <TextField
              placeholder="Passcode"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{
                "& fieldset": { borderRadius: "12px" },
                backgroundColor: "#fff",
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mt: 1,
                fontFamily: "Righteous, sans-serif",
                cursor: "pointer",
              }}
            >
              Having trouble in sign in?
            </Typography>

            <Button
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "rgba(0, 42, 209, 0.74)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "12px",
                textTransform: "none",
                fontFamily: "Righteous, sans-serif",
                "&:hover": {
                  backgroundColor: "rgba(0, 42, 209, 0.9)",
                },
              }}
              href="/meet/dashboard"
              onClick={() => {
                if (username.trim() !== "") setLoggedIn(true);
              }}
            >
              Sign in
            </Button>

            <Divider sx={{ my: 3 }}>Or Sign in with</Divider>

            <Stack direction="row" spacing={2} justifyContent="center">
              <IconButton
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  width: 48,
                  height: 48,
                }}
              >
                <GoogleIcon />
              </IconButton>
              <IconButton
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  width: 48,
                  height: 48,
                }}
              >
                <AppleIcon />
              </IconButton>
              <IconButton
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  width: 48,
                  height: 48,
                }}
              >
                <FacebookIcon />
              </IconButton>
            </Stack>

            <Typography
              variant="caption"
              display="block"
              align="center"
              mt={3}
              sx={{ fontFamily: "Righteous, sans-serif" }}
            >
              Don’t have an account?{" "}
              <span style={{ fontWeight: "bold", cursor: "pointer" }}>
                Request Now
              </span>
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography
          variant="h4"
          sx={{ fontFamily: "Righteous, sans-serif" }}
        >
          Welcome, {username}!
        </Typography>
      )}
    </Box>
  );
}
