import { useState, useEffect } from 'react';
import type { Message } from '../types';
import { loadMessages, saveMessages, subscribeToMessages } from '../utils/storage';
import { STICKY_COLORS } from '../utils/constants';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>(() => loadMessages());

  useEffect(() => {
    const unsubscribe = subscribeToMessages((newMessages) => {
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const addMessage = (text: string, author: string, imageUrl?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      author,
      timestamp: Date.now(),
      color: STICKY_COLORS[Math.floor(Math.random() * STICKY_COLORS.length)],
      imageUrl
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
  };

  return {
    messages,
    addMessage
  };
}