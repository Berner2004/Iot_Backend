const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  _id: String,
  name: String,
  location: String,
  apiKeyHash: String,
  lastSeenAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Device", deviceSchema);
