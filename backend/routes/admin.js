const express = require("express");
const router = express.Router();
const Advertisement = require("../models/Advertisement");
const Coupon = require("../models/Coupon");
const CouponOffer = require("../models/CouponOffer");

// Get all advertisements (including inactive)
router.get("/advertisements", async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.json({ success: true, advertisements: ads });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add new advertisement
router.post("/advertisements", async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const ad = new Advertisement({ title, description, imageUrl });
    await ad.save();
    res.json({
      success: true,
      message: "Advertisement added",
      advertisement: ad,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update advertisement
router.put("/advertisements/:id", async (req, res) => {
  try {
    const { title, description, imageUrl, isActive } = req.body;
    const ad = await Advertisement.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl, isActive },
      { new: true }
    );
    res.json({
      success: true,
      message: "Advertisement updated",
      advertisement: ad,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete advertisement
router.delete("/advertisements/:id", async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Advertisement deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all customers with coupons
router.get("/coupons", async (req, res) => {
  try {
    const coupons = await Coupon.find()
      .populate("customerId", "name")
      .populate("offerId", "title price");
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all coupon offers
router.get("/coupon-offers", async (req, res) => {
  try {
    const offers = await CouponOffer.find().sort({ createdAt: -1 });
    res.json({ success: true, offers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add new coupon offer
router.post("/coupon-offers", async (req, res) => {
  try {
    const { title, description, price, totalFacials, features } = req.body;
    const offer = new CouponOffer({
      title,
      description,
      price,
      totalFacials,
      features,
    });
    await offer.save();
    res.json({ success: true, message: "Coupon offer added", offer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update coupon offer
router.put("/coupon-offers/:id", async (req, res) => {
  try {
    const { title, description, price, totalFacials, features, isActive } =
      req.body;
    const offer = await CouponOffer.findByIdAndUpdate(
      req.params.id,
      { title, description, price, totalFacials, features, isActive },
      { new: true }
    );
    res.json({ success: true, message: "Coupon offer updated", offer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete coupon offer
router.delete("/coupon-offers/:id", async (req, res) => {
  try {
    await CouponOffer.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Coupon offer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update facial usage
router.put("/coupons/:id/update-facial", async (req, res) => {
  try {
    console.log("Updating facial for coupon ID:", req.params.id); // Add logging
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      console.log("Coupon not found for ID:", req.params.id); // Add logging
      return res.status(404).json({ message: "Coupon not found" });
    }

    // Check if coupon is expired
    if (coupon.validUntil && new Date() > new Date(coupon.validUntil)) {
      console.log("Coupon expired for ID:", req.params.id); // Add logging
      return res.status(400).json({ message: "Coupon has expired" });
    }

    if (coupon.facialsUsed >= coupon.totalFacials) {
      console.log("All facials already used for ID:", req.params.id); // Add logging
      return res.status(400).json({ message: "All facials already used" });
    }

    coupon.facialsUsed += 1;
    await coupon.save();
    console.log("Facial updated successfully for ID:", req.params.id); // Add logging
    res.json({ success: true, message: "Facial usage updated", coupon });
  } catch (error) {
    console.error("Server error updating facial:", error); // Add error logging
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
