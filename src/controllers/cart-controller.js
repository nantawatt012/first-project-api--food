const { Cart, Product, OrderHistory, Order } = require("../models");
const sequelize = require("sequelize");

exports.getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(req.params);
    const cartData = await Cart.findAll({
      attributes: [
        "productId",
        [sequelize.fn("count", sequelize.col("amount")), "count_amount"],
        "userId"
      ],
      where: { userId: userId },
      group: "productId",
      include: Product
    });
    res.status(200).json(cartData);
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    // console.log(req.body.sum);
    const oldCart = await Cart.findAll({
      attributes: [
        "productId",
        [sequelize.fn("count", sequelize.col("amount")), "count_amount"],
        "userId"
      ],
      where: { userId: req.user.id },
      group: "productId",
      include: Product
    });

    // console.log(JSON.stringify(oldCart, null, 2));
    await Order.create({ sumAmount: req.body.sum, userId: req.user.id });

    const lastId = await Order.findOne({
      attributes: ["id"],
      order: [["id", "DESC"]]
    });

    const output = oldCart.map((el) => {
      return {
        userId: el.userId,
        productId: el.productId,
        amount: el.dataValues.count_amount,
        orderId: lastId.id
      };
    });

    const findDeleId = await Cart.findAll({
      where: { userId: req.user.id }
    });
    // console.log(JSON.stringify(findDeleId, null, 2));
    const arrDeleteId = findDeleId.map((el) => {
      return el.id;
    });
    // console.log(arrDeleteId);

    await OrderHistory.bulkCreate(output);

    await Cart.destroy({ where: { id: arrDeleteId } });
    res.status(200).json(oldCart);
  } catch (err) {
    next(err);
  }
};

exports.incre = async (req, res, next) => {
  try {
    await Cart.create({
      amount: 1,
      userId: req.user.id,
      productId: req.body.productId
    });
    res.status(200).json("up");
  } catch (err) {
    next(err);
  }
};

exports.decre = async (req, res, next) => {
  try {
    // console.log(req.body.productId);
    const deleId = await Cart.findOne({
      where: { productId: req.body.productId }
    });
    // console.log(deleId);
    await Cart.destroy({ where: { id: deleId.id } });
    res.status(200).json("des");
  } catch (err) {
    next(err);
  }
};
