const express = require("express");

const cartController = require("../controllers/cart-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/:userId", authenticate, cartController.getCart);
router.post("/createOrder", authenticate, cartController.createOrder);

router.post("/incre", authenticate, cartController.incre);
router.post("/decre", authenticate, cartController.decre);

module.exports = router;
