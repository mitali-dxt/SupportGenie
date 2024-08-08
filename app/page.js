'use client'

import { useState } from "react";

export default function Home() {
    const [messages, setMessages] = useState({
      role:'assistant',
      content:'Hi, I am SupportGenie of Headstarter AI, how can I help you today?',
    });
    const [message,setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const sendMessage = async () => {
      if (!message.trim() || isLoading) return;
      setIsLoading(true);
      setMessage('')
      setMessages((messages) => [
        ...messages,
        { role: 'user', content: message },
        { role: 'assistant', content: '' },
      ])
    
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([...messages, { role: 'user', content: message }]),
        })
    
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        // Remove the closing curly brace
    
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
    
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const text = decoder.decode(value, { stream: true })
          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1]
            let otherMessages = messages.slice(0, messages.length - 1)
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + text },
            ]
          })
        }
      } catch (error) {
        console.error('Error:', error)
        setMessages((messages) => [
          ...messages,
          { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
        ])
      }
      setIsLoading(false)
    }
    
      // Send the message to the server
      const response = fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      }).then(async (res) => {
        const reader = res.body.getReader()  // Get a reader to read the response body
        const decoder = new TextDecoder()  // Create a decoder to decode the response text
    
        let result = ''
        // Function to process the text from the response
        return reader.read().then(function processText({ done, value }) {
          if (done) {
            return result
          }
          const text = decoder.decode(value || new Uint8Array(), { stream: true })  // Decode the text
          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1]  // Get the last message (assistant's placeholder)
            let otherMessages = messages.slice(0, messages.length - 1)  // Get all other messages
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + text },  // Append the decoded text to the assistant's message
            ]
          })
          return reader.read().then(processText)  // Continue reading the next chunk of the response
        })
      })

    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        sendMessage()
      }
    }

    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction={'column'}
          width="500px"
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
        >
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
                      ? 'primary.main'
                      : 'secondary.main'
                  }
                  color="white"
                  borderRadius={16}
                  p={3}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
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
    )
  }
