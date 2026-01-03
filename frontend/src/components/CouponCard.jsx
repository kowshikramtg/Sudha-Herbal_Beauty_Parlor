import React from 'react';

function CouponCard({ offer, myCoupon, onPurchase }) {
  return (
    <div className="coupon-card">
      <div className="coupon-header">
        <h2>🎁 Special Offer!</h2>
      </div>

      {!myCoupon ? (
        // Show offer details if user hasn't purchased
        <div className="coupon-content">
          <div className="coupon-value">
            <span className="currency">₹</span>
            <span className="amount">{offer.value}</span>
          </div>
          
          <div className="coupon-details">
            <h3>Exclusive Facial Package</h3>
            <ul>
              <li>✅ Get <strong>{offer.facials} Premium Facials</strong></li>
              <li>✅ Valid until <strong>{new Date(offer.validUntil).toLocaleDateString()}</strong></li>
              <li>✅ Choose any facial service</li>
              <li>✅ No hidden charges</li>
            </ul>
          </div>

          <div className="coupon-description">
            <p>{offer.description}</p>
          </div>

          <button className="purchase-btn" onClick={onPurchase}>
            Purchase Now
          </button>

          <div className="coupon-badge">
            Limited Time Offer! 🔥
          </div>
        </div>
      ) : (
        // Show coupon status if already purchased
        <div className="coupon-status">
          <h3>Your Active Coupon</h3>
          
          <div className="status-details">
            <div className="status-item">
              <span className="label">Value:</span>
              <span className="value">₹{myCoupon.couponValue}</span>
            </div>
            
            <div className="status-item">
              <span className="label">Facials Used:</span>
              <span className="value">{myCoupon.facialsUsed} / {myCoupon.totalFacials}</span>
            </div>
            
            <div className="status-item">
              <span className="label">Valid Until:</span>
              <span className="value">
                {new Date(myCoupon.validUntil).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${(myCoupon.facialsUsed / myCoupon.totalFacials) * 100}%` 
              }}
            ></div>
          </div>

          {myCoupon.facialsUsed < myCoupon.totalFacials ? (
            <p className="status-message">
              You have <strong>{myCoupon.totalFacials - myCoupon.facialsUsed}</strong> facial(s) remaining!
            </p>
          ) : (
            <p className="status-message completed">
              All facials used! Thank you for choosing us! 💖
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CouponCard;