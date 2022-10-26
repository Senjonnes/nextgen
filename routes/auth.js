const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signupValidation, loginValidation } = require("../utils/validation");
const { response } = require("../utils/response");

router.post("/signup", async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({ error: true, message: error?.details[0].message });

  const userExist = await User.findOne({ email: req.body.email });
  if (userExist)
    return res
      .status(409)
      .send({ error: true, message: "Email already exist" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(
      response(
        {
          email: savedUser.email,
          _id: savedUser._id,
        },
        false
      )
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .send({ error: true, message: error?.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(401)
      .send({ error: true, message: "Invalid email or password" });

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid)
    return res
      .status(401)
      .send({ error: true, message: "Invalid email or password" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: parseInt(process.env.TOKEN_EXPIRATION_TIME),
  });
  res.header("auth-token", token).send({ token });
});

router.post("/refresh-token", async (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(400).send({ error: true, message: "Token is required" });

  const decriptedToken = jwt.decode(token);
  if (!decriptedToken?._id)
    return res.status(400).send({ error: true, message: "Invalid token" });
  const refreshToken = jwt.sign(
    { _id: decriptedToken?._id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: parseInt(process.env.TOKEN_EXPIRATION_TIME),
    }
  );
  res.header("auth-token", token).send({ token: refreshToken });
});

module.exports = router;
