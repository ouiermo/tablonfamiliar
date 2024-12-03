import React from 'react';
import type { Message } from '../types';
import { STICKY_COLORS } from '../utils/constants';
import Avatar from 'react-avatar';
import { getUserProfile } from '../utils/storage';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No hay notas aún. ¡Sé el primero en escribir! ✨
      </div>
    );
  }

  return (
    <div className="h-[500px] overflow-y-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {messages.map((message) => {
          const userProfile = getUserProfile(message.author);
          return (
            <div
              key={message.id}
              className={`${message.color} p-4 rounded-lg shadow-md transform hover:-rotate-1 transition-transform duration-200 relative`}
              style={{
                minHeight: '150px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Avatar
                    name={message.author}
                    src={userProfile?.avatarUrl}
                    size="30"
                    round={true}
                  />
                  <span className="font-medium text-gray-800">
                    {message.author}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex-grow">
                {message.imageUrl && (
                  <div className="mb-2">
                    <img
                      src={message.imageUrl}
                      alt="Imagen adjunta"
                      className="max-w-full rounded-lg"
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
                    />
                  </div>
                )}
                <p className="text-gray-700 whitespace-pre-wrap">
                  {message.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}