const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const User = require("../model/User");
const { response } = require("../utils/response");

router.get("/users", verifyToken, async (req, res) => {
  const users = await User.find();
  res.send(response(users, false));
});

router.get("/user", verifyToken, async (req, res) => {
  const { user } = req;
  const userObject = await User.findOne({ _id: user?._id });
  res.send(response(userObject, false));
});

module.exports = router;
