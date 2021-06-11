import Joi from "joi";

class RequestValidator {
  static loginData() {
    const schema = Joi.object().keys({
      password: Joi.string().trim().min(8).max(35).required(),
      placa: Joi.string().trim().required().min(6).max(6)
    });
    return schema;
  }
}

module.exports = RequestValidator;
