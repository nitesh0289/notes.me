const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  console.log("inside middleware..");
  const authHeader = req.headers["authorization"];
  console.log({ authHeader });
  const token = authHeader;
  if (token == null) return res.status(401).send({ success: 401, message: "Un-authorized user!" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).send({ success: 403, message: "Session Expired, try to login again" });
    req.userId = user.userId;
    next();
  });
}

module.exports = {
  auth,
};
