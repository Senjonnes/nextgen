const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  //   const token = req.header("auth-token");
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(401).send({ error: true, message: "Unauthorized" });

  try {
    const userData = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = userData;
    next();
  } catch (err) {
    res.status(400).send({ error: true, message: "Invalid token" });
  }
};

module.exports = authorization;
