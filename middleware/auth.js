const jwt = require("jsonwebtoken");
const checkauth = (req, res, next) => {
  try {
    const authtoken = req.get("Authorization");
    if (!authtoken) {
      req.isAuth = false;
      return next();
    }
    const token = authtoken.split(" ")[1];
    if (!token) {
      req.isAuth = false;
      return next();
    }
    let tokendecoded = jwt.verify(token, "supersecret");
    req.isAuth = true;
    req.userId = tokendecoded.userId;
    return next();
  } catch (error) {
    req.isAuth = false;
    next();
  }
};

module.exports = checkauth;
