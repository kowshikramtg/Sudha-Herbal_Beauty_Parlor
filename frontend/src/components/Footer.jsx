import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-content">

        {/* Column 1: Brand & Contact */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">Sudha Herbal Beauty Parlour</h2>
          <div className="contact-info">
            <p>1<sup>st</sup> Cross Church Road, Behind Old Vasavi Lab, Chitradurga-577501 </p>
            <span className="footer-timings">Timings</span>
            <p>Mon - Fri: 10am - 8pm</p>
            <p>Sat - Sun: 11am - 6pm</p>
            <div className="contact-item">
              <strong>Contact:</strong>
              <p>Email: hello@sudhaherbal.com</p>
              <p>Phone: +91 9663962357</p>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col links-col">
          <h3>Quick Links:</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#offers">Offers</a></li>
            <li><a href="/login">Login / Register</a></li>
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div className="footer-col social-col">
          <h3>Contact Us:</h3>
          <div className="social-icons">
            <a href="https://wa.me/919663962357" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="mailto:hello@sudhaherbal.com" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-regular fa-envelope"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Sudha Herbal Beauty Parlour. All rights reserved.</p>
      </div>

      <style jsx>{`
        .footer-section {
          background: #FFFDF5;
          padding: 4rem 0 1rem;
          border-top: 5px solid var(--primary-peach);
          margin-top: 4rem;
          position: relative;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 3rem;
          padding-bottom: 3rem;
        }

        .footer-col {
          flex: 1;
          min-width: 300px;
        }

        /* Brand Column */
        .footer-logo {
          font-family: 'Cormorant Garamond', serif; /* Script-like elegant font */
          font-style: italic;
          font-size: 2.2rem;
          color: var(--accent-maroon);
          margin-bottom: 1.5rem;
        }

        .contact-info p {
          margin-bottom: 0.5rem;
          color: var(--text-brown);
          font-size: 0.95rem;
        }
        .footer-timings{
        margin: 10px 0 40px 0;
        color: var(--accent-maroon);
        font-weight: bold;
        }

        .contact-item {
          margin-top: 1.5rem;
        }
        .contact-item strong {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--accent-maroon);
        }

        /* Links Column */
        .links-col h3, .social-col h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--accent-maroon);
          margin-bottom: 1.5rem;
        }

        .links-col ul {
          list-style: none;
          padding: 0;
        }

        .links-col li {
          margin-bottom: 0.8rem;
        }

        .links-col a {
          text-decoration: none;
          color: var(--text-brown);
          transition: 0.3s;
          font-size: 0.95rem;
        }

        .links-col a:hover {
          color: var(--primary-coral);
          padding-left: 5px;
        }

        /* Social Column */
        .social-icons {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          background: var(--text-brown);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-weight: bold;
          transition: 0.3s;
          font-family: var(--font-sans);
        }

        .social-icon:hover {
          background: var(--primary-coral);
          transform: translateY(-3px);
        }

        /* Footer Bottom */
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(0,0,0,0.05);
          color: var(--text-light);
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .footer-logo { font-size: 2rem; }
          .footer-content { flex-direction: column; gap: 2rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
