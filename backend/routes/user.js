const express = require("express");
const router = express.Router();
const Advertisement = require("../models/Advertisement");
const Coupon = require("../models/Coupon");
const User = require("../models/User");

// Get active advertisements
router.get("/advertisements", async (req, res) => {
  try {
    const ads = await Advertisement.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json({ success: true, advertisements: ads });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get coupon offer details
router.get("/coupon-offer", async (req, res) => {
  try {
    // Static offer: ₹2000 for 3 facials
    const offer = {
      title: "Special Facial Package",
      description: "Get 3 premium facials for just ₹2000!",
      price: 2000,
      totalFacials: 3,
      features: ["Deep cleansing", "Hydration therapy", "Anti-aging treatment"],
    };
    res.json({ success: true, offer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Purchase coupon
router.post("/purchase-coupon", async (req, res) => {
  try {
    const { customerId, customerName } = req.body;

    // Check if user already has a coupon
    const existingCoupon = await Coupon.findOne({ customerId });
    if (existingCoupon) {
      return res
        .status(400)
        .json({ message: "You already have an active coupon" });
    }

    // Create new coupon
    const coupon = new Coupon({
      customerId,
      customerName,
      totalFacials: 3,
      facialsUsed: 0,
      price: 2000,
    });

    await coupon.save();

    res.json({
      success: true,
      message: "Coupon purchased successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user's coupon
router.get("/my-coupon/:userId", async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ customerId: req.params.userId });
    res.json({ success: true, coupon });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
