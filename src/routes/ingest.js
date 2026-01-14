const express = require("express");
const Reading = require("../models/Reading");
const auth = require("../middleware/authDevice");

const router = express.Router();

function pad(n){ return String(n).padStart(2,"0"); }

router.post("/ingest", auth, async (req,res) => {
  const d = new Date();
  const day = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const hour = d.getHours();
  const hourKey = `${day}T${pad(hour)}`;

  await Reading.create({
    deviceId: req.device._id,
    ts: d,
    day,
    hour,
    hourKey,
    ...req.body
  });

  res.json({ ok:true });
});

module.exports = router;
