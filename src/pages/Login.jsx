import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username === "manoj") {
      setStatus('Login successful  wait a moment');
    
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    };
  }
    return (
      <div>
        <h2>Login Page</h2>
        <input
          data-testid="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button data-testid="login-button" onClick={handleLogin}>
          Login
        </button>
        <p data-testid="status">{status}</p>
      </div>
    );
  }
