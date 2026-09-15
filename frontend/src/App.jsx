import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [statusMessage, setStatusMessage] = useState('');
  const [protectedData, setProtectedData] = useState(null);

  const API_URL = 'http://localhost:5000';

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      setStatusMessage(data.message);
    } catch (err) {
      setStatusMessage('Registration failed. Ensure backend is running.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setStatusMessage('Login successful! Token saved to LocalStorage.');
      } else {
        setStatusMessage(data.message);
      }
    } catch (err) {
      setStatusMessage('Login failed. Ensure backend is running.');
    }
  };

  const fetchProtectedData = async () => {
    try {
      const response = await fetch(`${API_URL}/protected`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setProtectedData(data);
      } else {
        setProtectedData(null);
        setStatusMessage(data.message);
      }
    } catch (err) {
      setStatusMessage('Failed to fetch protected route.');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setProtectedData(null);
    setStatusMessage('Logged out and token removed.');
  };

  return (
    <div className="auth-container">
      <h2>MERN JWT Auth Demo</h2>

      <form>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="button" onClick={handleRegister}>
            Register
          </button>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>

      {statusMessage && <div className="message-box">{statusMessage}</div>}

      <hr />

      <div>
        <h3>Protected Route Section</h3>
        <p>Current Token: {token ? 'Present in LocalStorage' : 'None'}</p>
        <div className="button-group">
          <button onClick={fetchProtectedData} disabled={!token}>
            Access /protected
          </button>
          {token && <button onClick={handleLogout}>Logout</button>}
        </div>

        {protectedData && (
          <div className="protected-box">
            <h4>Protected Payload:</h4>
            <p>{protectedData.message}</p>
            <small>Server Time: {protectedData.timestamp}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;