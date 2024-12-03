import React, { useState } from 'react';
import { PasswordScreen } from './components/PasswordScreen';
import { MessageBoard } from './components/MessageBoard';

const CORRECT_PASSWORD = 'familia';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleAuthenticate = (password: string, name: string) => {
    if (password === CORRECT_PASSWORD) {
      setUsername(name);
      setIsAuthenticated(true);
    } else {
      alert('Palabra clave incorrecta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
  };

  return isAuthenticated ? (
    <MessageBoard onLogout={handleLogout} username={username} />
  ) : (
    <PasswordScreen onAuthenticate={handleAuthenticate} />
  );
}

export default App;