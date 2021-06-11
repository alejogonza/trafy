import Joi from "joi";
import validationMessages from "./validation-messages.json";

class AppValidator {
  static async validateRequest(event, schema) {
    const request = event;

    this._validateBody(request);

    if (schema) {
      this._validate(schema, request);
    }
  }

  static _validateBody(request) {
    if (!request) {
      throw {
        code: 400,
        data: { message: "No Body" },
      };
    }
  }
  static _validate(schema, src) {
    const validation = Joi.validate(src, schema, {
      allowUnknown: true,
      abortEarly: false,
      language: validationMessages,
    });

    if (validation.error) {
      const messagesError = [];
      validation.error.details.forEach((value) => {
        messagesError.push(value.message);
      });
      console.log("error validacion::" + messagesError);
      throw {
        code: 400,
        data: { message: "Invalid request", data: messagesError },
      };
    }
  }
}

module.exports = AppValidator;
