require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");

const ingest = require("./routes/ingest");
const readings = require("./routes/readings");

(async ()=>{
  await connectDB(process.env.MONGODB_URI);

  const app = express();
  app.use(express.json());

  app.get("/health", (_,res)=>res.json({ ok:true }));

  // Rutas API
  app.use("/api", ingest);    // POST /api/ingest
  app.use("/api", readings);  // GET  /api/readings, /api/readings/latest

  app.listen(3000, ()=>console.log("API running on port 3000"));
})();
