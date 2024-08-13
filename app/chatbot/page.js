'use client';

import { useState, useRef, useEffect } from "react";
import { Box, Stack, TextField, Button, Typography, createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase'; 

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

  const finishConversation = () => {
    router.push('/feedback');
  };

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: 'black', 
            color: 'white', 
            '&:hover': {
              backgroundColor: '#333', 
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
        <Stack
          direction={'column'}
          width={isMobile ? '100%' : '500px'}
          height={isMobile ? '90%' : '700px'}
          border="1px solid #ccc"
          borderRadius={8}
          p={2}
          spacing={2}
          bgcolor="white"
          boxShadow={3}
          overflow="hidden"
        >
          <Box mb={2} textAlign="center">
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" mb={1}>
              SupportGenie
            </Typography>
            <Typography variant={isMobile ? "body2" : "body1"}>
              How can I assist you today?
            </Typography>
          </Box>
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
                      ? '#f0f0f0' 
                      : '#28a745'
                  }
                  color="black"
                  borderRadius={16}
                  p={2}
                  maxWidth="80%"
                  sx={{
                    wordBreak: 'break-word',
                  }}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Stack>

          <Stack direction={'column'} spacing={2}>
            <TextField
              label="Message"
              placeholder="Ask me anything..."
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              sx={{ 
                bgcolor: 'white',
                borderRadius: 8 
              }}
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={sendMessage}
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </Stack>
          </Stack>
          <Button
            variant="outlined"
            color="primary"
            onClick={finishConversation}
            sx={{ mt: 2 }}
            fullWidth
          >
            End Conversation
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
