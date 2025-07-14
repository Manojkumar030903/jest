import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        username,
      });

      setStatus(`Login Success! Welcome ${res.data.user.username}`);
      alert(res.data.message);
      navigate('/home');
    } catch (error) {
      setStatus('Login Failed: Invalid username');
    }
  };

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
