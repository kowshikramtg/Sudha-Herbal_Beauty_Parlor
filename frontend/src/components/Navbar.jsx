import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Navbar = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);

  // Initial Intro Animation
  useEffect(() => {
    // Wait 1.5s then collapse the logo (Intro)
    const timer = setTimeout(() => {
      setIsCollapsed(true);
      setInitialAnimationDone(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Periodic Animation Logic (Only when at top)
  useEffect(() => {
    if (!initialAnimationDone) return;

    let interval;
    if (scrolled) {
      // When scrolled down, always show the text
      setIsCollapsed(false);
    } else {
      // When at the top, oscillate between hidden and visible
      // We start by hiding it (if not already) to match "hide into star" feel
      setIsCollapsed(true);

      // Toggle every 2.5 seconds (2s hold + transition time approx)
      interval = setInterval(() => {
        setIsCollapsed((prev) => !prev);
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [scrolled, initialAnimationDone]);

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const text = "Sudha Herbal".split("");

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <div className={`logo ${isCollapsed ? 'collapsed' : 'expanded'}`}>
          <span className="logo-sparkle">✦</span>
          <div className="logo-text-container">
            {text.map((char, index) => (
              <span
                key={index}
                className="logo-char"
                style={{
                  transitionDelay: `${isCollapsed ? index * 50 : index * 30}ms`,
                  marginRight: char === ' ' ? '8px' : '0'
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#offers">Offers</a>
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              {/* <span className="welcome-text">Hi, {user.name}</span> */}
              {user.role === 'admin' && (
                <a href="/login" className="admin-link">Dashboard</a>
              )}
              <button onClick={onLogout} className="btn-logout">Logout</button>
            </div>
          ) : (
            <button onClick={handleLoginClick} className="btn-book">Login / Book</button>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          background: rgba(255, 253, 245, 0.9);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          height: 70px;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        /* Animated Logo Styles */
        .logo {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--accent-maroon);
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        
        .logo-sparkle {
          color: var(--primary-coral);
          display: inline-block;
          transition: transform 0.8s ease;
          font-size: 2rem;
        }
        
        /* Star Rotation */
        .logo.collapsed .logo-sparkle {
          transform: rotate(-360deg) scale(1.1);
        }
        .logo.expanded .logo-sparkle {
          transform: rotate(0deg) scale(1);
        }

        .logo-text-container {
          display: flex;
          overflow: hidden; /* Masking effect */
          height: 40px;
          align-items: center;
          padding-left: 5px; /* Avoiding initial clip */
        }

        .logo-char {
          display: inline-block;
          transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease, max-width 0.6s ease;
          opacity: 1;
          transform: translateX(0) scale(1);
          white-space: pre;
          color: var(--accent-maroon);
          max-width: 20px; /* Approximate char width */
        }

        /* Collapsed State: "Submerge into star" (Move Left & Fade & Scale Down) */
        /* Staggered delay handled in JS, but here we define the end state */
        .logo.collapsed .logo-char {
          transform: translateX(-40px) scale(0.5); /* Move deeper left and shrink */
          opacity: 0;
          max-width: 0; /* Collapse space smoothly */
        }

        /* Expanded State: Come out */
        .logo.expanded .logo-char {
          transform: translateX(0) scale(1);
          opacity: 1;
          max-width: 20px;
        }
        
        /* Rest of Navbar */
        .nav-links {
          display: flex;
          gap: 2.5rem;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--text-brown);
          font-weight: 500;
          font-family: var(--font-sans);
          transition: 0.3s;
          position: relative;
        }
        .nav-links a:hover {
          color: var(--accent-maroon);
        }
        .nav-links a::after {
          content: '';
          position: absolute; bottom: -5px; left: 0; width: 0; height: 2px;
          background: var(--primary-coral);
          transition: 0.3s;
        }
        .nav-links a:hover::after { width: 100%; }
        
        .btn-book {
           background: var(--accent-maroon);
           color: white;
           padding: 10px 24px;
           border-radius: 50px;
           font-weight: 600;
           font-size: 0.9rem;
           border: 1px solid var(--accent-maroon);
        }
        .btn-book:hover {
           background: transparent;
           color: var(--accent-maroon);
        }
        
        .user-menu {
           display: flex;
           align-items: center;
           gap: 1rem;
           font-size: 0.9rem;
           font-weight: 600;
        }
        .admin-link {
           color: var(--accent-maroon);
           text-decoration: underline;
        }
        .btn-logout {
           background: transparent;
           border: 1px solid var(--text-light);
           padding: 6px 16px;
           border-radius: 20px;
        }
        
        @media (max-width: 768px) {
           .nav-links { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
