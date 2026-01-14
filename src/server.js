require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");

const ingest = require("./routes/ingest");

(async ()=>{
  await connectDB(process.env.MONGODB_URI);

  const app = express();
  app.use(express.json());

  app.get("/health", (_,res)=>res.json({ok:true}));
  app.use("/api", ingest);

  app.listen(3000, ()=>console.log("API running on port 3000"));
})();
