const { validateCreateItem } = require("../validators/item-validator");
const { Product } = require("../models");

exports.getAllItem = async (req, res, next) => {
  try {
    console.dir(req.body);
    const items = await Product.findAll({
      where: { userId: 3 }
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
