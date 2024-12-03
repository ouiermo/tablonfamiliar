import type { Message, UserProfile } from '../types';
import { compressImage } from './imageUtils';

const STORAGE_KEY = 'family-board-messages';
const USERS_KEY = 'family-board-users';
const MAX_MESSAGES = 50; // Limit the number of stored messages

// Helper to check available space (approximate)
function hasStorageSpace(): boolean {
  try {
    const testKey = 'storage-test';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

// Clean up old messages if needed
function cleanupOldMessages(messages: Message[]): Message[] {
  if (messages.length > MAX_MESSAGES) {
    return messages.slice(-MAX_MESSAGES);
  }
  return messages;
}

export async function saveMessages(messages: Message[]): Promise<void> {
  try {
    const cleanedMessages = cleanupOldMessages(messages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedMessages));
  } catch (error) {
    console.error('Error saving messages:', error);
    throw new Error('No se pudieron guardar los mensajes. El almacenamiento está lleno.');
  }
}

export function loadMessages(): Message[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading messages:', error);
    return [];
  }
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    if (!hasStorageSpace()) {
      throw new Error('El almacenamiento está lleno');
    }

    // Compress avatar if present
    let compressedProfile = { ...profile };
    if (profile.avatarUrl) {
      compressedProfile.avatarUrl = await compressImage(profile.avatarUrl);
    }

    const users = loadUserProfiles();
    const updatedUsers = users.filter(u => u.username !== profile.username);
    updatedUsers.push(compressedProfile);

    // Keep only the last 20 user profiles
    if (updatedUsers.length > 20) {
      updatedUsers.shift();
    }

    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw new Error('No se pudo guardar el perfil. Intenta con una imagen más pequeña.');
  }
}

export function loadUserProfiles(): UserProfile[] {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading user profiles:', error);
    return [];
  }
}

export function getUserProfile(username: string): UserProfile | undefined {
  try {
    const users = loadUserProfiles();
    return users.find(u => u.username === username);
  } catch (error) {
    console.error('Error getting user profile:', error);
    return undefined;
  }
}

export function subscribeToMessages(callback: (messages: Message[]) => void): () => void {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(e.newValue ? JSON.parse(e.newValue) : []);
    }
  };
  
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}