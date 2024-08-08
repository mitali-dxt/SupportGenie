'use client'

import { useState } from "react";

export default function Home() {
    const [messages, setMessages] = useState({
      role:'assistant',
      content:'Hi, I am SupportGenie of Headstarter AI, how can I help you today?',
    });
    const [message,setMessage] = useState('');
    return <Box width="100vw"></Box>
}
