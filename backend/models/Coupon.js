const mongoose = require("mongoose");

// Coupon Schema - For tracking customer coupons
const couponSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CouponOffer",
    required: true,
  },
  totalFacials: {
    type: Number,
    default: 3,
  },
  facialsUsed: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 2000,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'confirmed'
  },
  paymentDate: {
    type: Date
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
  validUntil: {
    type: Date,
    default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from purchase
  },
});

module.exports = mongoose.model("Coupon", couponSchema);
