import React from 'react';

const AppointmentModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content glass">
                <button className="close-btn" onClick={onClose}>&times;</button>

                <h2 className="modal-title">Book Appointment</h2>

                <div className="instruction-box">
                    <p>Please contact us directly to schedule your appointment.</p>
                </div>

                <div className="contact-details">
                    <p className="contact-label">Call Us</p>
                    <p className="contact-number">+91 9663962357</p>
                </div>

                <a
                    href="https://wa.me/919663962357?text=Hello,%20I%20would%20like%20to%20book%20an%20appointment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                >Open WhatsApp</a>

                <div className="actions">
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(74, 55, 40, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .modal-content {
          width: 90%;
          max-width: 420px;
          border-radius: 30px;
          padding: 2.5rem;
          text-align: center;
          border: 1px solid rgba(255,255,255, 0.6);
          position: relative;
          background: #FFFDF5;
        }
        
        .close-btn {
          position: absolute;
          top: 20px;
          right: 25px;
          background: none;
          font-size: 2rem;
          color: var(--text-light);
          padding: 0;
        }
        
        .modal-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--accent-maroon);
          margin-bottom: 2rem;
        }
        
        .instruction-box {
           background: #f6e9d6ff;
           padding: 0.5rem;
           border-radius: 15px;
           margin-bottom: 2rem;
           color: var(--text-brown);
        }

        .contact-details {
            margin-bottom: 2rem;
        }
        .contact-label {
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 0.8rem;
            color: var(--text-light);
            font-weight: 600;
        }
        .contact-number {
            font-family: var(--font-serif);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--accent-maroon);
            margin-top: 0.5rem;
        }
        
        .whatsapp-btn {
           display: flex;
           justify-content: center;
           align-items: center;
           gap: 10px;
           background: #25D366;
           color: white;
           padding: 1rem;
           font-size: 1.2rem;
           border-radius: 50px;
           text-decoration: none;
           margin-bottom: 2rem;
           font-weight: 600;
           font-family: var(--font-sans);
           box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
           transition: 0.3s;
        }
        .whatsapp-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(37, 211, 102, 0.4); }
        
        .actions {
           display: flex;
           gap: 1rem;
           justify-content: center;
        }
        
        .btn-secondary { color: var(--text-light); border-color: var(--text-light); background: transparent; padding: 10px 28px; border-radius: 50px; border: 2px solid var(--text-light); font-weight: 600; cursor: pointer; }
        .btn-secondary:hover { background: var(--text-light); color: white; }
      `}</style>
        </div>
    );
};

export default AppointmentModal;
