import React, { useState } from 'react';
import axios from 'axios';

function Login({ setCurrentUser, setUserRole }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Handle User Login
  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isRegister ? '/api/auth/user/register' : '/api/auth/user/login';
      const response = await axios.post(endpoint, { name, password });

      if (response.data.success) {
        setCurrentUser(response.data.user);
        setUserRole('user');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Handle Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/admin/login', {
        username,
        password
      });

      if (response.data.success) {
        setCurrentUser(response.data.admin);
        setUserRole('admin');
      }else{
        setError('Invalid admin credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Admin login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Women's Beauty Parlour</h1>
        
        {/* Toggle between User and Admin */}
        <div className="toggle-buttons">
          <button 
            className={!isAdmin ? 'active' : ''} 
            onClick={() => setIsAdmin(false)}
          >
            Customer Login
          </button>
          <button 
            className={isAdmin ? 'active' : ''} 
            onClick={() => setIsAdmin(true)}
          >
            Manager Login
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* User Login/Register Form */}
        {!isAdmin ? (
          <form onSubmit={handleUserLogin}>
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" className="submit-btn">
              {isRegister ? 'Register' : 'Login'}
            </button>

            <p className="toggle-text">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Login' : 'Register'}
              </span>
            </p>
          </form>
        ) : (
          // Admin Login Form
          <form onSubmit={handleAdminLogin}>
            <h2>Manager Login</h2>
            
            <input
              type="text"
              placeholder="Manager username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <input
              type="password"
              placeholder="Manager password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button type="submit" className="submit-btn">
              Login as Manager
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;