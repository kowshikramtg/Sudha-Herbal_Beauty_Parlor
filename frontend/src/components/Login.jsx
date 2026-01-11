import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Hidden admin toggle
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Determine endpoint based on role and mode
    let endpoint = '';
    if (isAdmin) {
      // Admin -> /api/auth/admin/login
      endpoint = '/api/auth/admin/login';
    } else {
      // User -> /api/auth/user/login or /register
      endpoint = isLogin ? '/api/auth/user/login' : '/api/auth/user/register';
    }

    // Construct payload
    const payload = { ...formData };

    // If admin, map 'name' to 'username' as expected by backend
    if (isAdmin) {
      payload.username = formData.name;
      delete payload.name;
    }

    try {
      const res = await axios.post(endpoint, payload);
      if (res.data.success) {
        // Backend returns { user: ... } or { admin: ... }
        const data = res.data.user || res.data.admin;
        // Ensure role is passed back correctly
        const role = data.role || (isAdmin ? 'admin' : 'user');
        onLoginSuccess(data, role);
      }
    } catch (err) {
      console.error("Login Check:", err);
      setError(err.response?.data?.message || 'Authentication failed. Please check credentials.');
    }
  };

  // Hidden admin trigger: Triple click on the title
  const handleTitleClick = (e) => {
    if (e.detail === 3) {
      setIsAdmin(!isAdmin);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 onClick={handleTitleClick} className="auth-title">
          {isAdmin ? 'Admin Portal' : (isLogin ? 'Welcome Back' : 'Join Us')}
        </h2>
        <p className="auth-sub">Enter your details to continue</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && !isAdmin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>{isAdmin ? 'Admin ID' : (isLogin ? 'Name' : 'Name')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={isAdmin ? "admin" : "Your Name"}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          {!isAdmin && (
            <p>
              {isLogin ? "New here? " : "Already member? "}
              <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
                {isLogin ? 'Create Account' : 'Login'}
              </span>
            </p>
          )}
          <button onClick={onCancel} className="btn-cancel">Back to Home</button>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, var(--bg-body) 0%, rgba(150, 92, 40, 0.5) 100%);
          padding: 1rem;
        }
        .auth-card {
          width: 100%;
          max-width: 420px;
          text-align: center;
          border: 2px solid var(--primary-peach); /* Distinct border */
          border-top: 5px solid var(--secondary);
          background: #ffffff; /* Solid background for clarity */
          box-shadow: 0 15px 30px rgba(43, 32, 23, 0.15); /* Stronger shadow */
          border-radius: 30px;
          padding: 2.5rem;
        }
        .auth-title {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
          user-select: none;
          color: var(--accent);
          font-family: var(--font-serif);
        }
        .auth-sub {
          color: var(--text-light);
          margin-bottom: 2rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
          text-align: left;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 700;
          color: var(--text-main);
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #b9b5b5ff; /* Visible border */
          border-radius: 12px;
          background: #FFFDF5;
          font-family: inherit;
          transition: all 0.3s ease;
          box-sizing: border-box;
          font-size: 1rem;
          color: var(--text-brown);
        }
        input:focus {
          border-color: var(--secondary);
          background: white;
          box-shadow: 0 0 0 4px rgba(255, 182, 193, 0.2);
          outline: none;
        }
        .btn-submit {
          width: 100%;
          margin-top: 1rem;
          font-size: 1.1rem;
          padding: 1rem;
          background: #800020;
          color: #fff;
          border-radius: 50px;
          border: 2px solid #b9b5b5ff; /* Visible border */
          font-weight: 600;
        }
        .btn-submit:hover {
          background: #fff;
          color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(240, 128, 128, 0.3);
        }
        .error-msg {
          color: #d32f2f;
          background: #ffebee;
          padding: 0.8rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .toggle-link {
          color: var(--secondary-dark);
          cursor: pointer;
          font-weight: 700;
          text-decoration: underline;
        }
        .btn-cancel {
          background: none;
          color: var(--text-light);
          margin-top: 1.5rem;
          font-size: 0.9rem;
          box-shadow: none;
          padding: 0;
          text-decoration: none;
        }
        .btn-cancel:hover {
          color: var(--accent);
          background: none;
          transform: none;
          box-shadow: none;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;