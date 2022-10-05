const express = require("express");
const app = express();

// imports routes
const auth = require("./routes/auth");

// routes middleswares
app.use("/api/v1/auth", auth);

app.listen(3000, () => console.log("App is up and running"));
