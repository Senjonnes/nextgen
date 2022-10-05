const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// imports routes
const auth = require("./routes/auth");

// connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("Connected to DB")
);

// app middleswares
app.use(express.json());

// routes middlewares
app.use("/api/v1/auth", auth);

app.listen(3000, () => console.log("App is up and running"));
