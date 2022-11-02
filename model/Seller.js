const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  alias: {
    type: String,
    require: true,
    min: 2,
  },
  state: {
    type: String,
    require: true,
    min: 3,
  },
  city: {
    type: String,
    require: true,
    min: 3,
  },
  zipCode: {
    type: String,
    require: true,
    min: 6,
    max: 6,
  },
  addressLine1: {
    type: String,
    require: true,
    min: 6,
  },
  addressLine2: {
    type: String,
    min: 6,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Seller", sellerSchema);
