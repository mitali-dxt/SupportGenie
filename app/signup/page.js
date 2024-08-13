'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase'; // Adjust the import path based on your project structure
import Image from 'next/image'; // Use Next.js Image component for better performance

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to login page or main chat page after successful signup
      router.push('/login'); // Redirect to login after signup
    } catch (error) {
      setError('Failed to sign up. Please try again.');
    }
  };

  return (
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
          Welcome to SupportGenie
        </Typography>
        <Typography
          variant="body1"
          fontWeight="bold"
          mb={3}
        >
          Create a free SupportGenie account and ignite your curiosity!
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        {/* Signup Form */}
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
            fullWidth
            onClick={handleSignup}
            sx={{
                mt: 3,
                bgcolor: 'black', // Background color
                color: 'white', // Text color
                '&:hover': {
                bgcolor: '#333', // Background color on hover (dark grey)
                },
            }}
            >
            Sign Up
            </Button>

      </Box>
    </Box>
  );
}
