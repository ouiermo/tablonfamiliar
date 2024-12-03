import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { UserProfilePanel } from './UserProfilePanel';
import { LogOut } from 'lucide-react';
import { useMessages } from '../hooks/useMessages';
import { saveUserProfile } from '../utils/storage';

interface MessageBoardProps {
  onLogout: () => void;
  username: string;
}

export function MessageBoard({ onLogout, username }: MessageBoardProps) {
  const { messages, addMessage } = useMessages();

  const handleAddMessage = (text: string) => {
    addMessage(text, username);
  };

  const handleUpdateAvatar = async (imageUrl: string) => {
    try {
      await saveUserProfile({ username, avatarUrl: imageUrl });
    } catch (error) {
      console.error('Error updating avatar:', error);
      alert('No se pudo actualizar la foto de perfil. Intenta con una imagen más pequeña.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 bg-yellow-500 text-white flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Tablón Familiar 👨‍👩‍👧‍👦</h1>
              <p className="text-sm opacity-90">Hola, {username} 👋</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-yellow-600 rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4">
            <UserProfilePanel 
              username={username}
              onUpdateAvatar={handleUpdateAvatar}
            />
          </div>
          
          <MessageList messages={messages} />
          <MessageInput onSubmit={handleAddMessage} />
        </div>
      </div>
    </div>
  );
}