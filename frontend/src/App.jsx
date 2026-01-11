import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import ManagerDashboard from './components/ManagerDashboard';

import Footer from './components/Footer';

function App() {
  // Load user from local storage on mount
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [userRole, setUserRole] = useState(() => {
    const savedRole = localStorage.getItem('userRole');
    return savedRole ? savedRole : null;
  });
  const [view, setView] = useState('home'); // home, login, admin-dashboard

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    setCurrentUser(null);
    setUserRole(null);
    setView('home');
  };

  const handleLoginSuccess = (user, role) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', role);
    setCurrentUser(user);
    setUserRole(role);
    if (role === 'admin') {
      setView('admin-dashboard');
    } else {
      setView('home');
    }
  };

  // Handle initial view based on URL or User
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/login') {
      setView('login');
    } else if (currentUser && userRole === 'admin') {
      // If manually refreshed on other paths but is admin
      setView('admin-dashboard');
    }
  }, [currentUser, userRole]);

  return (
    <div className="App">
      {view === 'admin-dashboard' && userRole === 'admin' ? (
        <ManagerDashboard admin={currentUser} onLogout={handleLogout} />
      ) : (
        <>
          {view !== 'login' && <Navbar user={currentUser} onLogout={handleLogout} />}

          {view === 'home' && (
            <LandingPage user={currentUser} />
          )}

          {view === 'login' && (
            <Login
              onLoginSuccess={handleLoginSuccess}
              onCancel={() => setView('home')}
            />
          )}

          {view !== 'login' && view !== 'admin-dashboard' && <Footer />}
        </>
      )}
    </div>
  );
}

export default App;