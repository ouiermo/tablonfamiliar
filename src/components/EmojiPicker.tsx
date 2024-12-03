import React from 'react';
import { COMMON_EMOJIS } from '../utils/constants';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  return (
    <div className="flex flex-wrap gap-1 mb-2">
      {COMMON_EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onEmojiSelect(emoji)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          type="button"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}