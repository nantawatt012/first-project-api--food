const { validateCreateItem } = require("../validators/item-validator");
const { Product, User, Cart } = require("../models");
const createError = require("../utils/create-error");

exports.getShopOwner = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const ownerName = await User.findOne({ where: { id: shopId } });
    console.log(ownerName);
    if (ownerName.dataValues.role !== "seller") {
      createError("Not a seller", 400);
    }
    return res.status(200).json(ownerName);
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    // console.log(req.params);
    const { shopId, itemId } = req.params;
    // console.log(itemId, shopId);
    const item = await Product.findOne({ where: { id: itemId } });
    // verifily User? in front or back?
    await item.destroy();
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    // // const { productId } = req.body.id;
    // console.log(req.body.id);
    // console.log(req.body);
    await Product.update(req.body, { where: { id: req.body.id } });
    //and userId = shopId???
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

exports.getAllItem = async (req, res, next) => {
  try {
    const { shopId } = req.params;

    const items = await Product.findAll({
      where: { userId: shopId }
    });
    res.status(200).json({ items });
  } catch (err) {
    next(err);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const value = validateCreateItem(req.body);
    ////for Item
    value.userId = req.user.id;

    const item = await Product.create(value);
    res.status(201).json({ item });
  } catch (err) {
    next(err);
  }
};

exports.addItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const itemId = req.body.items.id;
    // console.log("userIdddddd", userId);
    // console.log("inputttttttt", itemId);
    await Cart.create({ amount: 1, userId: userId, productId: itemId });
  } catch (err) {
    next(err);
  }
};
