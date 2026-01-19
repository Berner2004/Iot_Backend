require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");

const ingest = require("./routes/ingest");
const readings = require("./routes/readings");
const cors = require("cors");

app.use(cors({
  origin: "*",               // para desarrollo / demo
  methods: ["GET","POST"],
  allowedHeaders: ["Content-Type","Authorization","x-device-id","x-api-key"]
}));

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api", ingest);
app.use("/api", readings);

const PORT = process.env.PORT || 3000;

// 🔥 Render necesita que el puerto se abra INMEDIATO
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

// Mongo en segundo plano (NO bloquea Render)
connectDB(process.env.MONGODB_URI).catch(err => {
  console.error("MongoDB failed but server is running:", err.message);
});
