import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CouponCard from './CouponCard.jsx';

function UserDashboard({ user, onLogout }) {
  const [advertisements, setAdvertisements] = useState([]);
  const [couponOffer, setCouponOffer] = useState(null);
  const [myCoupon, setMyCoupon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch advertisements
      const adsResponse = await axios.get('/api/user/advertisements');
      setAdvertisements(adsResponse.data.advertisements);

      // Fetch coupon offer
      const offerResponse = await axios.get('/api/user/coupon-offer');
      setCouponOffer(offerResponse.data.offer);

      // Fetch user's coupon if exists
      const couponResponse = await axios.get(`/api/user/my-coupon/${user.id}`);
      setMyCoupon(couponResponse.data.coupon);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Handle coupon purchase
  const handlePurchaseCoupon = async () => {
    try {
      const response = await axios.post('/api/user/purchase-coupon', {
        customerId: user.id,
        customerName: user.name
      });

      if (response.data.success) {
        alert('Coupon purchased successfully!');
        setMyCoupon(response.data.coupon);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to purchase coupon');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>🌸 Welcome, {user.name}!</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </header>

      <div className="dashboard-content">
        {/* Main Content Area */}
        <div className="main-content">
          <h2>✨ Special Offers & Promotions</h2>
          
          {/* Advertisements Section */}
          <div className="advertisements-section">
            {advertisements.length > 0 ? (
              advertisements.map((ad) => (
                <div key={ad._id} className="ad-card">
                  {ad.imageUrl && (
                    <div className="ad-image" style={{
                      background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
                    }}>
                      <span>📸</span>
                    </div>
                  )}
                  <div className="ad-content">
                    <h3>{ad.title}</h3>
                    <p>{ad.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No advertisements available</p>
            )}
          </div>
        </div>

        {/* Sidebar with Coupon Offer */}
        <aside className="sidebar">
          {couponOffer && (
            <CouponCard 
              offer={couponOffer} 
              myCoupon={myCoupon}
              onPurchase={handlePurchaseCoupon}
            />
          )}
        </aside>
      </div>
    </div>
  );
}

export default UserDashboard;