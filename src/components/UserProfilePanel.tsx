import React from 'react';
import { Download, Upload, User } from 'lucide-react';
import Avatar from 'react-avatar';
import { getUserProfile, loadMessages } from '../utils/storage';
import { ImageUpload } from './ImageUpload';

interface UserProfilePanelProps {
  username: string;
  onUpdateAvatar: (imageUrl: string) => void;
}

export function UserProfilePanel({ username, onUpdateAvatar }: UserProfilePanelProps) {
  const userProfile = getUserProfile(username);
  const messages = loadMessages();
  const userMessages = messages.filter(m => m.author === username);

  const handleDownloadNotes = () => {
    const notesText = userMessages
      .map(m => `${new Date(m.timestamp).toLocaleString()}\n${m.text}\n\n`)
      .join('---\n');
    
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notas-${username}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar
            name={username}
            src={userProfile?.avatarUrl}
            size="60"
            round={true}
          />
          <div className="absolute -bottom-2 -right-2">
            <ImageUpload
              onImageSelect={onUpdateAvatar}
              buttonClassName="bg-yellow-500 text-white p-1 rounded-full hover:bg-yellow-600 transition-colors"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            {username}
          </h2>
          <div className="text-sm text-gray-600 mt-1">
            Has publicado {userMessages.length} nota{userMessages.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDownloadNotes}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
            title="Descargar mis notas"
          >
            <Download className="w-4 h-4" />
            Descargar notas
          </button>
        </div>
      </div>
    </div>
  );
}