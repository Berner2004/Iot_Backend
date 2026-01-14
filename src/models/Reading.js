const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema({
  deviceId: String,
  ts: Date,
  day: String,
  hour: Number,
  hourKey: String,

  vrms: Number,
  irms: Number,
  p_w: Number,
  kwh_total: Number,
  pf: Number,
  apparent_va: Number,
  freq_hz: Number
});

readingSchema.index({ deviceId: 1, ts: -1 });

module.exports = mongoose.model("Reading", readingSchema);
