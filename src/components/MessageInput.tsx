import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { EmojiPicker } from './EmojiPicker';
import { ImageUpload } from './ImageUpload';

interface MessageInputProps {
  onSubmit: (text: string, imageUrl?: string) => void;
}

export function MessageInput({ onSubmit }: MessageInputProps) {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() || imageUrl) {
      onSubmit(text, imageUrl);
      setText('');
      setImageUrl(undefined);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setText((prev) => prev + emoji);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <EmojiPicker onEmojiSelect={handleEmojiSelect} />
      {imageUrl && (
        <div className="mb-2 relative">
          <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded" />
          <button
            type="button"
            onClick={() => setImageUrl(undefined)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
          placeholder="Escribe tu mensaje..."
        />
        <ImageUpload 
          onImageSelect={setImageUrl}
          buttonClassName="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}