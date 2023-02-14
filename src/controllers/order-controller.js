const { OrderHistory, Order, Product } = require("../models");
const { Op } = require("sequelize");

exports.orderList = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    const lastOrder = await Order.max("id", { where: { userId: req.user.id } });
    const listOrderDB = await OrderHistory.findAll({
      where: { [Op.and]: { userId: req.user.id, orderId: lastOrder } },
      include: [{ model: Order }, { model: Product }]
    });
    // console.log(JSON.stringify(listOrderDB, null, 2));
    res.status(200).json(listOrderDB);
  } catch (err) {
    next(err);
  }
};
