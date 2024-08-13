'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Typography, Stack, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

export default function Feedback() {
  const router = useRouter();
  const [feedback, setFeedback] = useState('');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFeedback = (type) => {
    setFeedback(type);
    console.log(`Feedback: ${type}`);
  };

  return (
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
      <Stack
        direction="column"
        width={isMobile ? '90%' : '400px'}
        maxWidth="90%"
        border="1px solid #ddd"
        borderRadius={12}
        p={4}
        spacing={3}
        bgcolor="white"
        boxShadow={4}
        alignItems="center"
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          fontWeight="bold"
          color="#333"
          textAlign="center"
        >
          How was your conversation with SupportGenie?
        </Typography>
        <Stack direction={isMobile ? "column" : "row"} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            onClick={() => handleFeedback('positive')}
            sx={{ borderRadius: '20px', fontWeight: 'bold', mb: isMobile ? 2 : 0 }}
          >
            👍
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleFeedback('negative')}
            sx={{ borderRadius: '20px', fontWeight: 'bold', mb: isMobile ? 2 : 0 }}
          >
            👎
          </Button>
        </Stack>
        <Typography
          variant="body1"
          color="#666"
          textAlign="center"
        >
          Would you like to continue chatting or end the conversation?
        </Typography>
        <Stack direction={isMobile ? "column" : "row"} spacing={3} justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.push('/')}
            sx={{ borderRadius: '20px', fontWeight: 'bold', mb: isMobile ? 2 : 0 }}
          >
            Continue Chatting
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push('/signup')}
            sx={{ borderRadius: '20px', fontWeight: 'bold', mb: isMobile ? 2 : 0 }}
          >
            End Conversation
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
