const router = require("express").Router();

router.post("/signup", (req, res) => {
  res.send("Registered");
});

module.exports = router;
