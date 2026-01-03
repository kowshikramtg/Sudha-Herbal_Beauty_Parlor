const express = require('express');
const router = express.Router();
const Advertisement = require('../models/Advertisement');
const Coupon = require('../models/Coupon');

// Get all advertisements (including inactive)
router.get('/advertisements', async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.json({ success: true, advertisements: ads });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new advertisement
router.post('/advertisements', async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const ad = new Advertisement({ title, description, imageUrl });
    await ad.save();
    res.json({ success: true, message: 'Advertisement added', advertisement: ad });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update advertisement
router.put('/advertisements/:id', async (req, res) => {
  try {
    const { title, description, imageUrl, isActive } = req.body;
    const ad = await Advertisement.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl, isActive },
      { new: true }
    );
    res.json({ success: true, message: 'Advertisement updated', advertisement: ad });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete advertisement
router.delete('/advertisements/:id', async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Advertisement deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all customers with coupons
router.get('/coupons', async (req, res) => {
  try {
    const coupons = await Coupon.find().populate('customerId', 'name');
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update facial usage for a customer
router.put('/coupons/:id/update-facial', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Check if all facials are already used
    if (coupon.facialsUsed >= coupon.totalFacials) {
      return res.status(400).json({ message: 'All facials already used' });
    }

    // Increment facial usage
    coupon.facialsUsed += 1;
    await coupon.save();

    res.json({ 
      success: true, 
      message: 'Facial usage updated', 
      coupon 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;