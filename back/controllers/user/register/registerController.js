import AppValidator from "./validator";
import joiValidate from "../../../libs/joiValidate";

// models
const User = require("../../../models/User");

// JWT
const jwt = require("jsonwebtoken");
import constants from "../../../libs/constants";

const register = async (req, res) => {
  try {
    await joiValidate.validateRequest(req.body, AppValidator.registerData());

    const PlacaValidator = await User.findOne({ placa: req.body.placa });

    if (PlacaValidator != null) {
      return res.status(400).json({
        message: "placa ya registrado",
        success: false,
      });
    } else {
      let params = {
        name: req.body.name,
        placa: req.body.placa.toLowerCase(),
        password: req.body.password,
      };
      const newUser = new User(params);
      newUser.password = await newUser.encryptPassword(req.body.password);
      await newUser.save();

      // create token
      const token = jwt.sign({ id: newUser._id }, constants.JWT, {});

      return res.status(200).json({
        message: "User successfully registered",
        success: true,
        token: token,
        user: {
          name: req.body.name,
          placa: req.body.placa.toLowerCase(),
        },
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

const placaValidate = async (req, res) => {
  try {
    await joiValidate.validateRequest(req.body, AppValidator.placaData());

    const placaValidator = await User.findOne({ placa: req.body.placa });
    if (placaValidator != null) {
      return res.status(400).json({
        message: "placa ya registrada",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "placa valida para registro",
        success: true,
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
  register,
  placaValidate
};
