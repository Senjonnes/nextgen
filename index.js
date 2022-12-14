const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// imports routes
const auth = require("./routes/auth");
const user = require("./routes/user");
const seller = require("./routes/seller");
const product = require("./routes/product");
const review = require("./routes/review");

// connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("Connected to DB")
);

// app middleswares
app.use(express.json());

// routes middlewares
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/seller", seller);
app.use("/api/v1/product", product);
app.use("/api/v1/review", review);

app.listen(3000, () => console.log("App is up and running"));
