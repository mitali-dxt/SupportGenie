'use client';

import { useState, useRef, useEffect } from "react";
import { Box, Stack, TextField, Button, Typography, createTheme, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase'; // Import your Firebase configuration

export default function Chatbot() {
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi, I am SupportGenie of Headstarter AI, how can I help you today?',
    }
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated, if not redirect to login page
    if (!auth.currentUser) {
      router.push('/login');
    }
  }, [router]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Define a custom theme for the chat interface
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: 'black', // Background color
            color: 'white', // Text color
            '&:hover': {
              backgroundColor: '#333', // Background color on hover
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
            borderRadius: 8,
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
        <Stack
          direction={'column'}
          width="500px"
          height="700px"
          border="1px solid #ccc"
          borderRadius={8}
          p={2}
          spacing={2}
          bgcolor="white"
          boxShadow={3}
        >
          {/* Header Section */}
          <Box mb={2} textAlign="center">
            <Typography variant="h4" fontWeight="bold" mb={1}>
              SupportGenie
            </Typography>
            <Typography variant="body2">
              How can I assist you today?
            </Typography>
          </Box>

          {/* Messages Section */}
          <Stack
            direction={'column'}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
              >
                <Box
                  bgcolor={
                    message.role === 'assistant'
                      ? '#f0f0f0' // Light gray for assistant messages
                      : '#28a745' // Green for user messages
                  }
                  color="black"
                  borderRadius={16}
                  p={2}
                  maxWidth="80%"
                >
                  {message.content}
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Stack>

          {/* Input Area */}
          <Stack direction={'row'} spacing={2}>
            <TextField
              label="Message"
              placeholder="Ask me anything..."
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
