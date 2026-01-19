require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const ingest = require("./routes/ingest");
const readings = require("./routes/readings");

// 1️⃣ Crear la app PRIMERO
const app = express();

// 2️⃣ Middlewares globales
app.use(express.json());

app.use(cors({
  origin: "*", // frontend en Render / dominio público
  methods: ["GET", "POST"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-device-id",
    "x-api-key"
  ]
}));

// 3️⃣ Health check
app.get("/health", (_, res) => res.json({ ok: true }));

// 4️⃣ Rutas
app.use("/api", ingest);
app.use("/api", readings);

// 5️⃣ Puerto (Render o local)
const PORT = process.env.PORT || 3000;

// 6️⃣ Escuchar INMEDIATO (Render necesita esto)
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

// 7️⃣ Conectar Mongo en segundo plano
connectDB(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connection established"))
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
  });
