import AppValidator from "./validator";
import joiValidate from "../../../libs/joiValidate";

// models
const User = require("../../../models/User");

const set_cart = async (req, res) => {
  try {
    await joiValidate.validateRequest(req.body, AppValidator.cartData());
    const ProductData = await ProductStore.findOne({
      productId: req.body.productId,
    });
    if (!ProductData) {
      return res.status(400).json({
        success: false,
        message: "Producto no encontrado",
        productId: req.body.productId,
      });
    } else {
      const UserData = await User.findById(req.userId);
      if (UserData.cart.length == 0) {
        const cartConstructor = await cartCreator(
          ProductData,
          req.body,
          req.userId
        );
        if (cartConstructor.success != undefined) {
          return res.status(400).json(cartConstructor);
        } else {
          const cartSet = new CartUser(cartConstructor);
          await cartSet.save();
          UserData.cart.push(cartSet);
          await UserData.save();
          return res.status(200).json({
            success: true,
            cart: UserData.cart,
          });
        }
      } else {
        const productCart = await CartUser.findOne({
          productId: req.body.productId,
        });
        if (productCart) {
          return res.status(400).json({
            success: false,
            message: "Producto ya ha sido añadido",
            productId: req.body.productId,
          });
        } else {
          const cartConstructor = await cartCreator(
            ProductData,
            req.body,
            req.userId
          );
          if (cartConstructor.success != undefined) {
            return res.status(400).json(cartConstructor);
          } else {
            const cartSet = new CartUser(cartConstructor);
            await cartSet.save();
            UserData.cart.push(cartSet);
            await UserData.save();
            return res.status(200).json({
              success: true,
              cart: UserData.cart,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    if (error && error.code) {
      return res.status(error.code).json(error.data);
    }
    return res.status(500).json(error);
  }
};

const trafficLight = async (req, res) => {
  try {

    const UserData = await User.findById(req.userId);
    if (UserData.cart.length > 0) {
      const getCartFormat = await getCart(UserData);
      return res.status(200).json(getCartFormat);
    } else {
      return res.status(200).json({
        success: true,
        cart: [],
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
  set_cart,
  trafficLight
};
