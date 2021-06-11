const jwt = require("jsonwebtoken");
import constants from "../libs/constants";
// User model
const User = require("../models/User");

async function verifyToken(req, res, next) {
  const token = req.headers["token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      errType: "token",
      message: "no hay token",
    });
  }

  try {
    const decoded = jwt.verify(token, constants.JWT);
    req.userId = decoded.id;
    var user = await User.findById(req.userId, {});
    if (user == null) {
      return res.status(401).json({
        auth: false,
        errType: "token",
        message: "token no valido",
      });
    }
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({
        title: "error",
        errType: "consult",
        message: "Consulta fallida, id invalido",
      });
    }
    if (error.name == "JsonWebTokenError") {
      return res.status(400).json({
        title: "error",
        errType: "token",
        message: "token invalido",
      });
    }
  }
  next();
}

module.exports = verifyToken;
