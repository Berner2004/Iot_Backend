require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");

const ingest = require("./routes/ingest");
const readings = require("./routes/readings");

(async ()=>{
  try {
    await connectDB(process.env.MONGODB_URI);

    const app = express();
    app.use(express.json());

    app.get("/health", (_,res)=>res.json({ ok:true }));

    app.use("/api", ingest);     // POST /api/ingest
    app.use("/api", readings);   // GET /api/readings, /api/readings/latest

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Fatal startup error:", err);
    process.exit(1);
  }
})();
