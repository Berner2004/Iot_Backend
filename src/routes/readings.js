const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

/**
 * Ajusta el nombre si tu colección no se llama "readings"
 */
const Reading = mongoose.connection.collection("readings");


