const router = require("express").Router();
const Product = require("../model/Product");
const Seller = require("../model/Seller");
const verifyToken = require("../utils/verifyToken");

router.post("/create", verifyToken, async (req, res) => {
  const userId = req?.user?._id;
  const seller = await Seller.findOne({ user: userId });
  if (!seller)
    return res.status(400).send({
      error: true,
      message: "User does not have a seller profile. Please create one",
    });
  Product.create({
    ...req.body,
    seller: seller?._id,
  })
    .then(async (savedProduct) => {
      const productObj = await savedProduct.populate("seller");
      res.send(productObj);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
