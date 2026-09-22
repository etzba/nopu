const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/users");

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  request.user = await User.findById(decodedToken.id);
  next();
};

module.exports = userExtractor;