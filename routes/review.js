const router = require("express").Router();
const Review = require("../model/Review");
const Product = require("../model/Product");
const verifyToken = require("../utils/verifyToken");

router.post("/create/:id", verifyToken, async (req, res) => {
  Review.create({
    ...req.body,
  })
    .then((savedReview) => {
      return Product.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comment: savedReview._id } },
        { new: true }
      ).populate("comment");
    })
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
