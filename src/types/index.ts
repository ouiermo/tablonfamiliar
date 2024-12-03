export interface Message {
  id: string;
  text: string;
  author: string;
  timestamp: number;
  color: string;
  imageUrl?: string;
}

export interface BoardState {
  isAuthenticated: boolean;
  messages: Message[];
  username: string;
}

export interface UserProfile {
  username: string;
  avatarUrl?: string;
}

// We don't need to declare createImageBitmap as it's a built-in browser API