const express = require("express");
const router = express.Router();
const Advertisement = require("../models/Advertisement");
const Coupon = require("../models/Coupon");
const CouponOffer = require("../models/CouponOffer");
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
router.get("/coupon-offers", async (req, res) => {
  try {
    const offers = await CouponOffer.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.json({ success: true, offers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Purchase coupon
router.post("/purchase-coupon", async (req, res) => {
  try {
    const { customerId, customerName, offerId } = req.body;

    // Check if user already has a coupon for this offer
    const existingCoupon = await Coupon.findOne({ customerId, offerId });
    if (existingCoupon) {
      return res
        .status(400)
        .json({ message: "You already have an active coupon for this offer" });
    }

    // Get the offer details
    const offer = await CouponOffer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Create new coupon
    const coupon = new Coupon({
      customerId,
      customerName,
      offerId,
      totalFacials: offer.totalFacials,
      facialsUsed: 0,
      price: offer.price,
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

// Get user's coupons
router.get("/my-coupons/:userId", async (req, res) => {
  try {
    const coupons = await Coupon.find({
      customerId: req.params.userId,
    }).populate("offerId");
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
