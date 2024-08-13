'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography, createTheme, ThemeProvider, Link, useMediaQuery } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase'; 
import Image from 'next/image'; 

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login'); 
    } catch (error) {
      setError('Failed to sign up. Please try again.');
    }
  };
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: 'black', 
            color: 'white', 
            '&:hover': {
              backgroundColor: '#333',
            },
          },
        },
      },
    },
  });

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bgcolor="#F2EFE4" 
        p={2}
      >
        <Box
          width={isMobile ? '90%' : '400px'}
          p={4}
          border="1px solid #ccc"
          borderRadius={8}
          boxShadow={3}
          textAlign="center"
        >
          <Box mb={3}>
            <Image
              src="/chatbot.png" 
              alt="Chatbot"
              width={isMobile ? 80 : 100} 
              height={isMobile ? 80 : 100} 
            />
          </Box>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight="bold"
            fontSize={isMobile ? "1.25rem" : "1.5rem"}
            mb={2}
          >
            Welcome to SupportGenie
          </Typography>
          <Typography
            variant="body1"
            fontWeight="bold"
            mb={3}
          >
            Create a free SupportGenie account and ignite your curiosity!
          </Typography>
          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}
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
            onClick={handleSignup}
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>
          <Box mt={3}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/login" underline="hover" color="primary">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
