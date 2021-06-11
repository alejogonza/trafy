import Joi from "joi";

class RequestValidator {
  static edit_userData() {
    const schema = Joi.object().keys({
      name: Joi.string().trim().regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$/).min(5).max(20)
      .error((errors) => {
        errors.forEach((err) => {
          if(err.type == "string.regex.base") {
              err.message = {name: "Tu nombre no puede tener numeros"};
          }
        });
        return errors;
      }),
surname: Joi.string().trim().regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$/).min(5).max(50)    
        .error((errors) => {
        errors.forEach((err) => {
          if(err.type == "string.regex.base") {
              err.message = {surname: "Tu apellido no puede tener numeros"};
          }
        });
        return errors;
      }),
    cedula: Joi.number().integer().min(10000).max(9999999999),
    phone: Joi.number().integer().min(1000000000).max(9999999999),
    password: Joi.string().trim().min(8).max(35),

    });
    return schema;
  }
  static edit_password_userData() {
    const schema = Joi.object().keys({
    password: Joi.string().trim().min(8).max(35)
    });
    return schema;
  }
  static edit_email_userData() {
    const schema = Joi.object().keys({
      email: Joi.string().trim().email(),
    });
    return schema;
  }
  static add_address_userData() {
    const schema = Joi.object().keys({
      directionTag: Joi.string().trim().max(15).required(),
      city: Joi.string().trim().valid(...["Medellin"]).required(),
      department: Joi.string().trim().valid(...["Antioquia"]).required(),
      number: Joi.string().trim().required().min(1).max(5),
      principal: Joi.string().trim().required().min(1).max(5),
      references: Joi.string().trim().min(4).max(50).required(),
      secondary: Joi.string().trim().required().min(1).max(5),
      segmentation: Joi.string().trim().valid(
        ...[
          "Carrera",
          "Calle",
          "Transversal",
          "Diagonal",
          "Av. Calle",
          "Av. Carrerra",
        ]
      ).required(),
      lat: Joi.number().required().min(-90).max(90),
    lng: Joi.number().required().min(-180).max(180)
    });
    return schema;
  }
  static select_address_userData() {
    const schema = Joi.object().keys({
      addressId: Joi.string().trim().required(),
    });
    return schema;
  }
  static get_address_userData() {
    const schema = Joi.object().keys({
      addressId: Joi.string().trim()
    });
    return schema;
  }
}

module.exports = RequestValidator;
