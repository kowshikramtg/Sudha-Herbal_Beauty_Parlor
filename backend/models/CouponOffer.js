const mongoose = require("mongoose");

// Coupon Offer Schema - For admin-created coupon offers
const couponOfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalFacials: {
    type: Number,
    required: true,
    default: 3,
  },
  features: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CouponOffer", couponOfferSchema);
