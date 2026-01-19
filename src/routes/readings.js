const express = require("express");
const Reading = require("../models/Reading");

const router = express.Router();

/**
 * GET /api/readings
 * Query params opcionales:
 *  - deviceId
 *  - from (YYYY-MM-DD)
 *  - to   (YYYY-MM-DD)
 *  - limit (default 50)
 */
router.get("/readings", async (req, res) => {
  try {
    const { deviceId, from, to, limit = 50 } = req.query;

    const query = {};

    if (deviceId) query.deviceId = deviceId;

    if (from || to) {
      query.day = {};
      if (from) query.day.$gte = from;
      if (to) query.day.$lte = to;
    }

    const readings = await Reading
      .find(query)
      .sort({ ts: -1 })
      .limit(Number(limit));

    res.json(readings);
  } catch (err) {
    console.error("Error reading readings:", err);
    res.status(500).json({ error: "Failed to fetch readings" });
  }
});

/**
 * GET /api/readings/latest
 * Devuelve la última lectura registrada
 */
router.get("/readings/latest", async (_req, res) => {
  try {
    const latest = await Reading
      .findOne({})
      .sort({ ts: -1 });

    res.json(latest || null);
  } catch (err) {
    console.error("Error reading latest:", err);
    res.status(500).json({ error: "Failed to fetch latest reading" });
  }
});

module.exports = router;
