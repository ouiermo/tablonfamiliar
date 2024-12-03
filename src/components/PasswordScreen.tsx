import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { saveUserProfile } from '../utils/storage';

interface PasswordScreenProps {
  onAuthenticate: (password: string, username: string) => void;
}

export function PasswordScreen({ onAuthenticate }: PasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      try {
        setError(undefined);
        await saveUserProfile({ username, avatarUrl });
        onAuthenticate(password, username);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al guardar el perfil');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-yellow-100 p-4 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Tablón Familiar</h1>
          <p className="text-gray-600 text-center mt-2">
            Ingresa tus datos para acceder 📝
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            {avatarUrl ? (
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setAvatarUrl(undefined)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <ImageUpload
                onImageSelect={setAvatarUrl}
                buttonClassName="bg-gray-100 p-4 rounded-full hover:bg-gray-200 transition-colors"
              />
            )}
            <p className="text-sm text-gray-500 mt-2">Añade tu foto de perfil (opcional)</p>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Tu nombre
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
              placeholder="¿Cómo te llamas?"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Palabra clave
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
              placeholder="Palabra clave familiar"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-200 font-medium"
          >
            Entrar al Tablón
          </button>
        </form>
      </div>
    </div>
  );
}