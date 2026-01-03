import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import ManagerDashboard from './components/ManagerDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  return (
    <div className="App">
      {!currentUser ? (
        // Show Login Page
        <Login 
          setCurrentUser={setCurrentUser} 
          setUserRole={setUserRole} 
        />
      ) : userRole === 'admin' ? (
        // Show Manager Dashboard
        <ManagerDashboard 
          admin={currentUser} 
          onLogout={handleLogout} 
        />
      ) : (
        // Show User Dashboard
        <UserDashboard 
          user={currentUser} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
}

export default App;