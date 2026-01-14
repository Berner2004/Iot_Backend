const bcrypt = require("bcryptjs");
const Device = require("../models/Device");

module.exports = async function(req, res, next) {
  const deviceId = req.header("x-device-id");
  const apiKey = req.header("x-api-key");

  if (!deviceId || !apiKey)
    return res.status(401).json({ error: "Missing headers" });

  const device = await Device.findById(deviceId);
  if (!device) return res.status(401).json({ error: "Unknown device" });

  const ok = await bcrypt.compare(apiKey, device.apiKeyHash);
  if (!ok) return res.status(401).json({ error: "Invalid key" });

  device.lastSeenAt = new Date();
  await device.save();

  req.device = device;
  next();
};
