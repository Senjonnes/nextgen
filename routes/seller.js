const router = require("express").Router();
const Seller = require("../model/Seller");
const verifyToken = require("../utils/verifyToken");

router.post("/create", verifyToken, async (req, res) => {
  const seller = await Seller.findOne({ user: req?.user?._id });
  if (seller)
    return res.status(422).send({
      error: true,
      message: "Seller profile for this user already exists",
    });
  Seller.create({
    ...req?.body,
    user: req?.user?._id,
  })
    .then((savedSeller) => {
      res.send(savedSeller);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/sellers", verifyToken, async (req, res) => {
  try {
    const sellers = await Seller.find().populate("user", "name email");
    res.json(sellers);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
