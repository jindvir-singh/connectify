import React, { useState } from 'react';
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Container,
  Paper,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function RegistrationStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    tenant_name: '',
    tenant_email: '',
    tenant_password_hash: '',
    chat_selected: false,
    video_call_selected: false,
    voice_call_selected: false,
    screensharing_selected: false,
    documents_selected: false,
    all_other_selected: false,
    license_type: 'free',
  });

  const steps = ['Account Details', 'Feature Selection', 'Subscription Plan'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateStep = () => {
    setError('');
    if (activeStep === 0) {
      if (!formData.tenant_name.trim()) return setError('Tenant name is required.');
      if (!formData.tenant_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        return setError('Please enter a valid email address.');
      if (formData.tenant_password_hash.length < 6)
        return setError('Password must be at least 6 characters.');
    }
    if (activeStep === 1) {
      if (
        !formData.chat_selected &&
        !formData.video_call_selected &&
        !formData.voice_call_selected &&
        !formData.screensharing_selected &&
        !formData.documents_selected &&
        !formData.all_other_selected
      ) {
        return setError('Please select at least one feature.');
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep() === true) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError('');
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep() !== true) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://localhost:8089/tenant/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h5">Create Your Account</Typography>
            <TextField
              label="Tenant Name"
              name="tenant_name"
              value={formData.tenant_name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email Address"
              name="tenant_email"
              type="email"
              value={formData.tenant_email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Password"
              name="tenant_password_hash"
              type="password"
              value={formData.tenant_password_hash}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h5">Select Features</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {[
                { name: 'chat_selected', label: 'Chat' },
                { name: 'video_call_selected', label: 'Video Call' },
                { name: 'voice_call_selected', label: 'Voice Call' },
                { name: 'screensharing_selected', label: 'Screensharing' },
                { name: 'documents_selected', label: 'Documents Sharing' },
                { name: 'all_other_selected', label: 'All Other Features' }
              ].map(({ name, label }) => (
                <FormControlLabel
                  key={name}
                  control={<Checkbox checked={formData[name]} onChange={handleChange} name={name} />}
                  label={label}
                />
              ))}
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h5">Choose a Plan</Typography>
            <FormControl component="fieldset">
              <FormLabel>Subscription Type</FormLabel>
              <RadioGroup
                name="license_type"
                value={formData.license_type}
                onChange={handleChange}
                sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}
              >
                {['free', 'standard', 'premium', 'enterprise'].map((plan) => (
                  <FormControlLabel
                    key={plan}
                    value={plan}
                    control={<Radio />}
                    label={plan.charAt(0).toUpperCase() + plan.slice(1)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 0 }}>
      <Paper elevation={3} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4 }}>
        <Typography variant="h4" align="center">Sign Up for Your Account</Typography>
        <Stepper activeStep={activeStep} sx={{ my: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{
                '& .MuiStepLabel-label': {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }
              }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box sx={{ mt: 4 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isSubmitted ? (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">Thank you for registering! 🎉</Typography>
                  <Typography color="text.secondary" sx={{ mb: 4 }}>
                    Your registration is complete. We're excited to have you on board.
                  </Typography>
                  <Button variant="contained" component={Link} href="/" sx={{ borderRadius: 8, px: 6, py: 1.5 }}>
                    Go to Login
                  </Button>
                </Box>
              ) : (
                <Box>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1, borderRadius: 8 }}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                      sx={{ borderRadius: 8, px: 4 }}
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </Box>
              )}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Paper>
    </Container>
  );
}
