const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rate: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
    require: true,
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

module.exports = mongoose.model("Review", reviewSchema);
