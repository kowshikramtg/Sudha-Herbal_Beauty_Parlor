import React, { useState } from 'react';

const PaymentModal = ({ offer, onClose, onComplete }) => {
  const [step, setStep] = useState('pay'); // pay, confirm

  const handlePaid = () => {
    setStep('confirm');
  };

  const handleSent = () => {
    onComplete();
    setStep('success');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <button className="close-btn" onClick={onClose}>&times;</button>

        {step === 'pay' ? (
          <div className="payment-step">
            <h2 className="modal-title">Secure Payment</h2>

            <div className="card-summary">
              <span className="summary-label">Standard Plan</span>
              <div className="amount-display">₹{offer.price}</div>
              <p className="upi-id">UPI: <strong>sudha@bank</strong></p>
            </div>

            <div className="qr-container">
              <div className="qr-box">
                <div className="qr-placeholder">
                  <span className="scan-icon">📷</span>
                  <span className="scan-text">SCAN QR</span>
                </div>
              </div>
            </div>

            <div className="actions">
              <button className="btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn-primary" onClick={handlePaid}>I Have Paid</button>
            </div>
          </div>
        ) : step === 'confirm' ? (
          <div className="confirm-step">
            <h2 className="modal-title">Verification</h2>
            <div className="instruction-box">
              <p>Please send a <b>Screenshot</b> of your payment for verification.</p>
            </div>

            <a
              href="https://wa.me/919663962357?text=Payment%20Screenshot%20Attached"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <span className="wa-icon">📱</span> Open WhatsApp
            </a>

            <div className="actions">
              <button className="btn-primary" onClick={handleSent}>Sent Screenshot</button>
            </div>
          </div>
        ) : (
          <div className="success-step">
            <div className="success-icon">🎉</div>
            <h2 className="modal-title">Request Sent!</h2>
            <p className="success-message">
              Transaction details sent.<br />
              Status will be updated within 24 hours.
            </p>
            <div className="actions">
              <button className="btn-primary" onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(74, 55, 40, 0.4); /* soft brown overlay */
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
          background: #FFFDF5; /* cream */
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
        
        .card-summary {
           margin-bottom: 2rem;
        }
        .summary-label {
           text-transform: uppercase;
           letter-spacing: 2px;
           font-size: 0.8rem;
           color: var(--text-light);
           font-weight: 600;
        }
        .amount-display {
           font-family: var(--font-serif);
           font-size: 3.5rem;
           font-weight: 700;
           line-height: 1;
           color: var(--accent-maroon);
           margin: 0.5rem 0;
        }
        .upi-id {
           color: var(--text-brown);
           font-size: 0.9rem;
        }
        
        .qr-container {
           margin-bottom: 2rem;
           display: flex;
           justify-content: center;
        }
        .qr-box {
           width: 180px; height: 180px;
           border: 2px dashed var(--primary-coral);
           border-radius: 20px;
           padding: 10px;
           background: var(--white);
        }
        .qr-placeholder {
           width: 100%; height: 100%;
           background: #FFF0F5; /* blush tint */
           border-radius: 12px;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           color: var(--primary-coral);
        }
        .scan-icon { font-size: 2rem; margin-bottom: 0.5rem; }
        .scan-text { font-weight: 700; letter-spacing: 1px; font-size: 0.8rem; }
        
        .instruction-box {
           background: #FFF5E6; /* peach tint */
           padding: 1.5rem;
           border-radius: 15px;
           margin-bottom: 2rem;
           color: var(--text-brown);
        }
        
        .whatsapp-btn {
           display: flex;
           justify-content: center;
           align-items: center;
           gap: 10px;
           background: #25D366;
           color: white;
           padding: 1rem;
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
        
        .btn-primary { background: var(--accent-maroon); color: white; padding: 12px 30px; }
        .btn-secondary { color: var(--text-light); border-color: var(--text-light); }
        .btn-secondary:hover { background: var(--text-light); color: white; }
        
        .success-step { text-align: center; }
        .success-icon { font-size: 4rem; margin-bottom: 1rem; }
        .success-message { color: var(--text-brown); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
      `}</style>
    </div>
  );
};

export default PaymentModal;
