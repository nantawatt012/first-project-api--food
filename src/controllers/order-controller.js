const { OrderHistory, Order, Product } = require("../models");
const { Op } = require("sequelize");

exports.getLastOrder = async (req, res, next) => {
  try {
    const lastOrder = await Order.max("id", { where: { userId: req.user.id } });
    const listOrderDB = await OrderHistory.findAll({
      where: { [Op.and]: { userId: req.user.id, orderId: lastOrder } },
      include: [{ model: Order }, { model: Product }]
    });
    res.status(200).json(listOrderDB);
  } catch (err) {
    next(err);
  }
};

exports.getAllCusHis = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allOrder = await OrderHistory.findAll({
      where: { userId: userId },
      include: Product
    });
    res.status(200).json(allOrder);
  } catch (err) {
    next(err);
  }
};

exports.getAllSell = async (req, res, next) => {
  try {
    const sellerId = req.user.id;
    const result = await Product.findAll({
      where: { userId: sellerId }
    });
    const productIdOwn = result.map((el) => el.id);

    const allOrder = await OrderHistory.findAll({
      where: { productId: { [Op.in]: productIdOwn } },
      include: Product
    });

    res.status(200).json(allOrder);
  } catch (err) {
    next(err);
  }
};
