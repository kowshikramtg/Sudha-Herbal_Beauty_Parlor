import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagerDashboard = ({ admin, onLogout }) => {
  const [coupons, setCoupons] = useState([]);
  const [ads, setAds] = useState([]);
  const [offers, setOffers] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // pending, coupons, ads, offers



  const fetchCoupons = async () => {
    try {
      const res = await axios.get('/api/admin/coupons');
      if (res.data.success) setCoupons(res.data.coupons);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAds = async () => {
    try {
      const res = await axios.get('/api/admin/advertisements');
      if (res.data.success) setAds(res.data.advertisements);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOffers = async () => {
    try {
      const res = await axios.get('/api/admin/coupon-offers');
      if (res.data.success) setOffers(res.data.offers);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoupons();
    fetchAds();
    fetchOffers();
  }, []);

  const handleConfirmCoupon = async (couponId, status) => {
    try {
      await axios.put(`/api/admin/confirm-coupon/${couponId}`, { status });
      fetchCoupons();
      // alert(`Coupon ${status}`);
    } catch (error) {
      console.error(error);
      alert("Error updating status");
    }
  };

  const pendingCoupons = coupons.filter(c => c.status === 'pending');
  const otherCoupons = coupons.filter(c => c.status !== 'pending');

  return (
    <div className="admin-dashboard">
      <header className="admin-header glass">
        <div className="header-logo">Admin Panel</div>
        <div className="user-info">
          <span>{admin.name}</span>
          <button onClick={onLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="admin-content">
        <aside className="sidebar">
          <nav>
            <button
              className={activeTab === 'pending' ? 'active' : ''}
              onClick={() => setActiveTab('pending')}
            >
              Approvals <span className="badge">{pendingCoupons.length}</span>
            </button>
            <button
              className={activeTab === 'coupons' ? 'active' : ''}
              onClick={() => setActiveTab('coupons')}
            >
              All Coupons
            </button>
            <button
              className={activeTab === 'offers' ? 'active' : ''}
              onClick={() => setActiveTab('offers')}
            >
              Offers
            </button>
            <button
              className={activeTab === 'ads' ? 'active' : ''}
              onClick={() => setActiveTab('ads')}
            >
              Advertisements
            </button>
          </nav>
        </aside>

        <main className="main-panel">
          {activeTab === 'pending' && (
            <div className="section fade-in">
              <div className="section-header">
                <h3>Pending Verification</h3>
                <p>Review customer payments</p>
              </div>

              {pendingCoupons.length === 0 ? (
                <div className="empty-state card">
                  <p>All cleared! No pending payments.</p>
                </div>
              ) : (
                <div className="grid-list">
                  {pendingCoupons.map(coupon => (
                    <div key={coupon._id} className="card pending-card">
                      <div className="card-header">
                        <h4>{coupon.customerId?.name || 'Unknown User'}</h4>
                        <span className="amount">₹{coupon.price}</span>
                      </div>
                      <p className="offer-title">{coupon.offerId?.title}</p>
                      <p className="date">{new Date(coupon.createdAt).toLocaleString()}</p>

                      <div className="actions">
                        <button
                          className="btn-reject"
                          onClick={() => handleConfirmCoupon(coupon._id, 'rejected')}
                        >
                          Reject
                        </button>
                        <button
                          className="btn-confirm"
                          onClick={() => handleConfirmCoupon(coupon._id, 'confirmed')}
                        >
                          Confirm Payment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="section fade-in">
              <h3>All Coupons History</h3>
              <div className="card table-card">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Offer</th>
                      <th>Status</th>
                      <th>Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherCoupons.map(coupon => (
                      <tr key={coupon._id}>
                        <td>{coupon.customerId?.name}</td>
                        <td>{coupon.offerId?.title}</td>
                        <td><span className={`status-pill ${coupon.status}`}>{coupon.status}</span></td>
                        <td>
                          <div className="usage-bar">
                            <div
                              className="fill"
                              style={{ width: `${(coupon.facialsUsed / coupon.totalFacials) * 100}%` }}
                            ></div>
                          </div>
                          <small>{coupon.facialsUsed}/{coupon.totalFacials}</small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(activeTab === 'ads' || activeTab === 'offers') && (
            <div className="section fade-in">
              <div className="card placeholder">
                <h3>{activeTab === 'ads' ? 'Advertisements' : 'Offers'} Manager</h3>
                <p className="sub">This module is under maintenance.</p>
                <div className="stats-row">
                  <div className="stat-pill">Total Items: {activeTab === 'ads' ? ads.length : offers.length}</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background-color: var(--bg-body);
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: white;
          box-shadow: var(--shadow-soft);
          z-index: 10;
          position: relative;
        }
        .header-logo {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--accent);
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
        }
        .btn-logout {
          background: none;
          border: 1px solid var(--text-light);
          color: var(--text-light);
          padding: 0.4rem 1rem;
          font-size: 0.8rem;
          box-shadow: none;
        }
        .btn-logout:hover {
          background: var(--text-main);
          color: white;
        }
        
        .admin-content {
          display: flex;
          min-height: calc(100vh - 80px);
        }
        .sidebar {
          width: 260px;
          background: white;
          padding: 2rem 1rem;
          border-right: 1px solid rgba(0,0,0,0.05);
        }
        .sidebar button {
          width: 100%;
          text-align: left;
          background: none;
          color: var(--text-light);
          padding: 1rem;
          margin-bottom: 0.5rem;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: none;
        }
        .sidebar button.active {
          background: var(--primary);
          color: var(--accent);
          font-weight: 700;
        }
        .sidebar button:hover:not(.active) {
          background: var(--bg-body);
        }
        .badge {
          background: white;
          color: var(--accent);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
        }
        
        .main-panel {
          flex: 1;
          padding: 3rem;
          overflow-y: auto;
        }
        
        .grid-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .pending-card {
           padding: 1.5rem;
           background: white;
           border-left: 4px solid var(--secondary);
        }
        .card-header {
           display: flex;
           justify-content: space-between;
           margin-bottom: 0.5rem;
        }
        .amount {
           font-weight: 700;
           color: var(--accent);
        }
        .offer-title {
           font-weight: 600;
           margin-bottom: 0.2rem;
        }
        .date {
           font-size: 0.8rem;
           color: var(--text-light);
           margin-bottom: 1.5rem;
        }
        .actions {
           display: flex;
           gap: 1rem;
        }
        .btn-confirm {
           background: #4caf50; /* Green */
           color: white;
           flex: 1;
           font-size: 0.9rem;
           box-shadow: none;
        }
        .btn-reject {
           background: #f44336; /* Red */
           color: white;
           flex: 1;
           font-size: 0.9rem;
           box-shadow: none;
        }
        
        .table-card {
           padding: 0;
           overflow: hidden;
           border: none;
        }
        table {
           width: 100%;
           border-collapse: collapse;
        }
        th, td {
           padding: 1.2rem;
           text-align: left;
           border-bottom: 1px solid #eee;
        }
        th {
           background: #fafafa;
           color: var(--text-light);
           font-weight: 600;
           text-transform: uppercase;
           font-size: 0.8rem;
        }
        .status-pill {
           padding: 4px 12px;
           border-radius: 20px;
           font-size: 0.8rem;
           font-weight: 600;
           text-transform: uppercase;
        }
        .status-pill.confirmed { background: #e8f5e9; color: #2e7d32; }
        .status-pill.rejected { background: #ffebee; color: #c62828; }
        
        .usage-bar {
           width: 100px;
           height: 6px;
           background: #eee;
           border-radius: 3px;
           margin-bottom: 4px;
           overflow: hidden;
        }
        .fill {
           height: 100%;
           background: var(--secondary);
        }
      `}</style>
    </div>
  );
};

export default ManagerDashboard;
