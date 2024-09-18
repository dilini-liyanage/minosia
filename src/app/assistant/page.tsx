'use client';
import React, { useState } from 'react';

import ChatPage from '@/components/home/ChatPage';
import { Welcome } from '@/components/home/Welcome';
import { SearchBar } from '@/components/SearchBar';

interface ChatMessage {
  content: string;
  timestamp: string;
  isUser: boolean;
}

export default function Assistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      content: message,
      timestamp: new Date().toLocaleTimeString(),
      isUser: true,
    };
    setMessages([...messages, newMessage]);
    setShowWelcome(false);

    setTimeout(() => {
      const minosiaResponse: ChatMessage = {
        content:
          'Lorem ipsum dolor sit amet consectetur. Massa donec ac velit vulputate amet.Lorem ipsum dolor sit amet consectetur. Massa donec ac velit vulputate amet',
        timestamp: new Date().toLocaleTimeString(),
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, minosiaResponse]);
    }, 1000);
  };

  return (
    <div className="container mx-auto h-full">
      <div className="2xl:mx-48 xl:mx-24 lg:mx-12 mx-0 flex flex-col h-full">
        <main className="flex-grow flex items-center justify-center px-4 h-[50vh]">
          {showWelcome ? <Welcome /> : <ChatPage messages={messages} />}
        </main>
        <footer className="p-4 h-2/7">
          <SearchBar onSendMessage={handleSendMessage} />
        </footer>
      </div>
    </div>
  );
}
