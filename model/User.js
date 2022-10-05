const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 225,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 225,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1562,
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

module.exports = mongoose.model("User", userSchema);
