import Joi from "joi";

class RequestValidator {
  static loginData() {
    const schema = Joi.object().keys({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(8).max(35).required(),
      FCMtoken: Joi.string().trim().min(163).max(200),
    });
    return schema;
  }
  static registerData() {
    const schema = Joi.object().keys({
      name: Joi.string().trim().regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$/).min(5).max(60).required()
        .error((errors) => {
          errors.forEach((err) => {
            if(err.type == "string.regex.base") {
                err.message = {name: "Tu nombre no puede tener numeros"};
            }
          });
          return errors;
        }),
      password: Joi.string().trim().min(8).max(35).required(),
      placa: Joi.string().trim().required().min(6).max(6)
    });

    return schema;
  }
  static placaData() {
    const schema = Joi.object().keys({
      placa: Joi.string().trim().required().min(6).max(6),
    });

    return schema;
  }

}

module.exports = RequestValidator;
