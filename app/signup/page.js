'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase'; // Adjust the import path based on your project structure

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to login page after successful signup
      router.push('/login');
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
    >
      <Box
        width="400px"
        p={4}
        border="1px solid #ccc"
        borderRadius={8}
        boxShadow={3}
        textAlign="center"
      >
        <Typography variant="h5" mb={3}>
          Sign Up
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
        <Typography mt={2}>
          Already have an account?{' '}
          <Button
            variant="text"
            color="primary"
            onClick={() => router.push('/login')}
          >
            Log In
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
