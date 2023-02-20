const express = require("express");

const authenticate = require("../middlewares/authenticate");
const orderController = require("../controllers/order-controller");

const router = express.Router();

router.get("/:userId", authenticate, orderController.lastOrderList);

module.exports = router;
