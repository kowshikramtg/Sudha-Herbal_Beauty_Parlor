import React, { useState, useEffect } from "react";
import axios from "axios";
import CouponCard from "./CouponCard.jsx";
import "../componentCss/UserDashboard.css";
import img from "../assets/wImg.jpeg";

function UserDashboard({ user, onLogout }) {
  const [advertisements, setAdvertisements] = useState([]);
  const [couponOffers, setCouponOffers] = useState([]);
  const [myCoupons, setMyCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount


  const fetchData = async () => {
    try {
      // Fetch advertisements
      const adsResponse = await axios.get("/api/user/advertisements");
      setAdvertisements(adsResponse.data.advertisements);

      // Fetch coupon offers
      const offersResponse = await axios.get("/api/user/coupon-offers");
      setCouponOffers(offersResponse.data.offers);

      // Fetch user's coupons
      const couponsResponse = await axios.get(
        `/api/user/my-coupons/${user.id}`
      );
      setMyCoupons(couponsResponse.data.coupons);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle coupon purchase
  const handlePurchaseCoupon = async (offerId) => {
    try {
      const response = await axios.post("/api/user/purchase-coupon", {
        customerId: user.id,
        customerName: user.name,
        offerId,
      });

      if (response.data.success) {
        alert("Coupon purchased successfully!");
        fetchData(); // Refresh data
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to purchase coupon");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <img src={img} alt="logo" />
        <h2 className="brand-name">Sudha Herbal Beauty Parlour</h2>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </header>
      <div className="hor-line"></div>
      <h1 className="headline">🌸 Welcome,<span>{user.name[0].toUpperCase()}</span>{user.name.slice(1)}</h1>

      <div className="dashboard-content">
        {/* Main Content Area */}
        <div className="main-content">
          <span className="desc">Welcome to our Beauty salon, where we believe that everyone deserves to look and feel their best. We prefer natural beauty and wellness.</span>
          <h2>Special Offers & Promotions</h2>

          {/* Advertisements Section */}
          <div className="advertisements-section">
            {advertisements.length > 0 ? (
              advertisements.map((ad) => (
                <div key={ad._id} className="ad-card">
                  {ad.imageUrl && (
                    <div
                      className="ad-image"
                      style={{
                        background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                      }}
                    >
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

        {/* Sidebar with Coupon Offers */}
        <aside className="sidebar">
          <h3>Available Offers</h3>
          {couponOffers.length > 0 ? (
            couponOffers.map((offer) => {
              const myCoupon = myCoupons.find(
                (c) => c.offerId._id === offer._id
              );
              return (
                <CouponCard
                  key={offer._id}
                  offer={offer}
                  myCoupon={myCoupon}
                  onPurchase={() => handlePurchaseCoupon(offer._id)}
                />
              );
            })
          ) : (
            <p>No offers available</p>
          )}
        </aside>
      </div>
    </div>
  );
}

export default UserDashboard;
