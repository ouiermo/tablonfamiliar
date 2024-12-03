import React, { useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  buttonClassName?: string;
}

export function ImageUpload({ onImageSelect, buttonClassName }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={buttonClassName || "p-2 hover:bg-gray-100 rounded transition-colors"}
        title="Añadir imagen"
      >
        <ImageIcon className="w-5 h-5" />
      </button>
    </>
  );
}