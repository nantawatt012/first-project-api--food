const { Product } = require("../models");
const { Op } = require("sequelize");

exports.getItemFood = async (req, res, next) => {
  try {
    const productDB = await Product.findAll({
      where: { type: { [Op.like]: "food" } }
    });
    // console.log(productDB);
    res.status(200).json(productDB);
  } catch (err) {
    next(err);
  }
};
