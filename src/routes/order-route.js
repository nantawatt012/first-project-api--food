const express = require("express");

const authenticate = require("../middlewares/authenticate");
const orderController = require("../controllers/order-controller");

const router = express.Router();

router.get("/getAll", authenticate, orderController.getAllCusHis);
router.get("/getAllSell", authenticate, orderController.getAllSell);
router.get("/:userId", authenticate, orderController.getLastOrder);

module.exports = router;
