import AppValidator from "./validator";
import joiValidate from "../../../libs/joiValidate";
// models
const User = require("../../../models/User");

const userData = async (req, res) => {
  try {
    const UserData = await User.findById(req.userId);
    return res.status(200).json({
      success: true,
      user: {
        name: UserData.name,
        surname: UserData.surname,
        cedula: UserData.cedula,
        phone: UserData.phone,
        email: UserData.email,
      },
    });
  } catch (error) {
    console.log(error);
    if (error && error.code) {
      return res.status(error.code).json(error.data);
    }
    return res.status(500).json(error);
  }
};

const edit_userData = async (req, res) => {
  try {
    await joiValidate.validateRequest(req.body, AppValidator.edit_userData());
    if (req.body.cedula) req.body.cedula = req.body.cedula.toString();
    if (req.body.phone) req.body.phone = req.body.phone.toString();
    if (req.body.name)
      req.body.name =
        req.body.name.charAt(0).toUpperCase() +
        req.body.name.slice(1).toLowerCase();
    //non-repeated email,cedula,phone validator
    const EmailValidator = await User.findOne({ email: req.body.email });
    const CedulaValidator = await User.findOne({
      cedula: req.body.cedula ? req.body.cedula : "",
    });
    const PhoneValidator = await User.findOne({
      phone: req.body.phone ? req.body.phone : "",
    });

    if (PhoneValidator != null) {
      return res.status(400).json({
        message: "celular ya registrado",
        success: false,
      });
    }
    if (CedulaValidator != null) {
      return res.status(400).json({
        message: "cedula ya registrada",
        success: false,
      });
    }
    if (EmailValidator != null) {
      return res.status(400).json({
        message: "correo ya registrado",
        success: false,
      });
    } else {
      let params = {
        name: req.body.name,
        surname: req.body.surname,
        cedula: req.body.cedula,
        phone: req.body.phone,
        email: req.body.email,
      };

      for (let prop in params) if (!params[prop]) delete params[prop];

      const updatedData = await User.findByIdAndUpdate(req.userId, params, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        user: {
          name: updatedData.name,
          surname: updatedData.surname,
          cedula: updatedData.cedula,
          phone: updatedData.phone,
          email: updatedData.email,
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


module.exports = {
  userData,
  edit_userData
};
