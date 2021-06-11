import AppValidator from "./validator";
import joiValidate from "../../../libs/joiValidate";
import { FCMvalidator } from "../../../libs/tokensValidator";
// models
const User = require("../../../models/User");

// JWT
const jwt = require("jsonwebtoken");
import constants from "../../../libs/constants";

const login = async (req, res) => {
  try {
    await joiValidate.validateRequest(req.body, AppValidator.loginData());
   const UserData = await User.findOne({ placa: req.body.placa.toLowerCase() });

    //email exist validate
    if (!UserData) {
      return res.status(400).json({
        message: "Placa no encontrada",
        success: false,
      });
    }

    //password match validate
    const matchpass = await UserData.matchPassword(req.body.password);

    if (!matchpass) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
        user: null,
        success: false,
        token: null,
      });
    } else {
      // create token
      const token = jwt.sign({ id: UserData._id }, constants.JWT, {});

      return res.status(200).json({
        message: "Successful login",
        auth: true,
        token: token,
        user: {
          name: UserData.name,
          placa: UserData.placa,
        }
      });
    }
  } catch (error) {
    console.log(error);
    if (error && error.code) {
      return res.status(error.code).json(error.data);
    }
    return res.status(500).json(error);
  }
};


module.exports = {
  login
};
