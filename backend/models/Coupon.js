const mongoose = require("mongoose");

// Coupon Schema - For tracking customer coupons
const couponSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: {
    type: String,
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
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Coupon", couponSchema);
