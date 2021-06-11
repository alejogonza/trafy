import Joi from "joi";

class RequestValidator {
  static cartData() {
    const schema = Joi.object().keys({
      quantity: Joi.number().integer().required(),
      productId: Joi.string().trim().required(),
      skus: Joi.array()
        .items(
          Joi.object({
            selection: Joi.string().trim().required(),
            skuId: Joi.string().trim().required(),
          })
        )
        .unique((a, b) => a.skuId == b.skuId),
    });

    return schema;
  }

  static deleteProductCartData() {
    const schema = Joi.object().keys({
      productId: Joi.string().trim().required(),
    });

    return schema;
  }

  static getProductCartData() {
    const schema = Joi.object().keys({
      productId: Joi.string().trim().required(),
    });

    return schema;
  }

}

module.exports = RequestValidator;
