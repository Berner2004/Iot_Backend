const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Accedemos directamente a la colección readings
const getCollection = () =>
  mongoose.connection.collection("readings");

/**
 * GET /api/readings
 * Opcional: ?deviceId=XXX&limit=100
 */
router.get("/readings", async (req, res) => {
  try {
    const { deviceId, limit = 50 } = req.query;

    const query = deviceId ? { deviceId } : {};

    const readings = await getCollection()
      .find(query)
      .sort({ ts: -1 })
      .limit(Number(limit))
      .toArray();

    res.json(readings);
  } catch (err) {
    console.error("Error reading data:", err);
    res.status(500).json({ error: "Failed to read readings" });
  }
});

/**
 * GET /api/readings/latest
 */
router.get("/readings/latest", async (_, res) => {
  try {
    const latest = await getCollection()
      .find({})
      .sort({ ts: -1 })
      .limit(1)
      .toArray();

    res.json(latest[0] || null);
  } catch (err) {
    console.error("Error reading latest:", err);
    res.status(500).json({ error: "Failed to read latest reading" });
  }
});

module.exports = router;
