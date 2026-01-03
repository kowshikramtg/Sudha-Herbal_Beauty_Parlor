import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManagerDashboard({ admin, onLogout }) {
  const [activeTab, setActiveTab] = useState('ads'); // 'ads' or 'coupons'
  const [advertisements, setAdvertisements] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form for new/edit advertisement
  const [adForm, setAdForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    isActive: true
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [adsRes, couponsRes] = await Promise.all([
        axios.get('/api/admin/advertisements'),
        axios.get('/api/admin/coupons')
      ]);

      setAdvertisements(adsRes.data.advertisements);
      setCoupons(couponsRes.data.coupons);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Handle add/update advertisement
  const handleSaveAd = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing ad
        await axios.put(`/api/admin/advertisements/${editingId}`, adForm);
        alert('Advertisement updated successfully!');
      } else {
        // Add new ad
        await axios.post('/api/admin/advertisements', adForm);
        alert('Advertisement added successfully!');
      }

      // Reset form and refresh data
      setAdForm({ title: '', description: '', imageUrl: '', isActive: true });
      setEditingId(null);
      fetchData();
    } catch (error) {
      alert('Failed to save advertisement');
    }
  };

  // Handle delete advertisement
  const handleDeleteAd = async (id) => {
    if (!window.confirm('Are you sure you want to delete this advertisement?')) {
      return;
    }

    try {
      await axios.delete(`/api/admin/advertisements/${id}`);
      alert('Advertisement deleted!');
      fetchData();
    } catch (error) {
      alert('Failed to delete advertisement');
    }
  };

  // Handle edit advertisement
  const handleEditAd = (ad) => {
    setAdForm({
      title: ad.title,
      description: ad.description,
      imageUrl: ad.imageUrl || '',
      isActive: ad.isActive
    });
    setEditingId(ad._id);
  };

  // Update facial usage
  const handleUpdateFacial = async (couponId) => {
    try {
      await axios.put(`/api/admin/coupons/${couponId}/update-facial`);
      alert('Facial usage updated!');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="manager-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>👨‍💼 Manager Dashboard</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </header>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={activeTab === 'ads' ? 'active' : ''}
          onClick={() => setActiveTab('ads')}
        >
          📢 Manage Advertisements
        </button>
        <button 
          className={activeTab === 'coupons' ? 'active' : ''}
          onClick={() => setActiveTab('coupons')}
        >
          🎫 Coupon Monitoring
        </button>
      </div>

      {/* Advertisements Tab */}
      {activeTab === 'ads' && (
        <div className="tab-content">
          <h2>Advertisement Management</h2>

          {/* Add/Edit Form */}
          <form onSubmit={handleSaveAd} className="ad-form">
            <h3>{editingId ? 'Edit Advertisement' : 'Add New Advertisement'}</h3>
            
            <input
              type="text"
              placeholder="Advertisement Title"
              value={adForm.title}
              onChange={(e) => setAdForm({ ...adForm, title: e.target.value })}
              required
            />

            <textarea
              placeholder="Advertisement Description"
              value={adForm.description}
              onChange={(e) => setAdForm({ ...adForm, description: e.target.value })}
              required
              rows="3"
            />

            <input
              type="text"
              placeholder="Image URL (optional)"
              value={adForm.imageUrl}
              onChange={(e) => setAdForm({ ...adForm, imageUrl: e.target.value })}
            />

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={adForm.isActive}
                onChange={(e) => setAdForm({ ...adForm, isActive: e.target.checked })}
              />
              Active
            </label>

            <div className="form-buttons">
              <button type="submit" className="save-btn">
                {editingId ? 'Update' : 'Add'} Advertisement
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingId(null);
                    setAdForm({ title: '', description: '', imageUrl: '', isActive: true });
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Advertisements List */}
          <div className="ads-list">
            <h3>All Advertisements</h3>
            {advertisements.map((ad) => (
              <div key={ad._id} className={`ad-item ${!ad.isActive ? 'inactive' : ''}`}>
                <div className="ad-info">
                  <h4>{ad.title}</h4>
                  <p>{ad.description}</p>
                  <span className="status-badge">
                    {ad.isActive ? '✅ Active' : '❌ Inactive'}
                  </span>
                </div>
                <div className="ad-actions">
                  <button onClick={() => handleEditAd(ad)}>Edit</button>
                  <button onClick={() => handleDeleteAd(ad._id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coupons Tab */}
      {activeTab === 'coupons' && (
        <div className="tab-content">
          <h2>Coupon Monitoring</h2>
          
          <table className="coupons-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Facials Used</th>
                <th>Remaining</th>
                <th>Valid Until</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon.customerName}</td>
                    <td>{coupon.facialsUsed} / {coupon.totalFacials}</td>
                    <td>{coupon.totalFacials - coupon.facialsUsed}</td>
                    <td>{new Date(coupon.validUntil).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleUpdateFacial(coupon._id)}
                        disabled={coupon.facialsUsed >= coupon.totalFacials}
                        className={coupon.facialsUsed >= coupon.totalFacials ? 'disabled' : ''}
                      >
                        {coupon.facialsUsed >= coupon.totalFacials ? 'Completed' : 'Mark Facial Used'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No coupons purchased yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManagerDashboard;