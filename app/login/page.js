'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography, createTheme, ThemeProvider, Link } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase'; // Adjust the import path based on your project structure
import Image from 'next/image'; // Use Next.js Image component for better performance

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the main chat page or any other page
      router.push('/chatbot');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  // Define a custom theme for the button
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: 'black', // Background color
            color: 'white', // Text color
            '&:hover': {
              backgroundColor: '#333', // Background color on hover
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#F2EFE4" // Background color
      >
        <Box
          width="400px"
          p={4}
          border="1px solid #ccc"
          borderRadius={8}
          boxShadow={3}
          textAlign="center"
        >
          {/* Chatbot Image */}
          <Box mb={3}>
            <Image
              src="/chatbot.png" // Path to the image in public folder
              alt="Chatbot"
              width={100} // Adjust width as needed
              height={100} // Adjust height as needed
            />
          </Box>

          {/* Welcome Text */}
          <Typography
            variant="h5"
            fontWeight="bold"
            fontSize="1.5rem"
            mb={2}
          >
            Welcome Back to SupportGenie
          </Typography>
          <Typography
            variant="body1"
            fontWeight="bold"
            mb={3}
          >
            Log in to your account and continue chatting!
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

          {/* Login Form */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ mt: 3 }}
          >
            Login
          </Button>

          {/* Additional Links */}
          <Box mt={3}>
            <Typography variant="body2" mt={1}>
              Don't have an account?{' '}
              <Link href="/signup" underline="hover" color="primary">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
