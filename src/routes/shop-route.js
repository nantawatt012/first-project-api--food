const express = require("express");

const authenticate = require("../middlewares/authenticate");
const shopController = require("../controllers/shop-controller");

const router = express.Router();

router.get("/:shopId", shopController.getAllItem);
router.post("/", authenticate, shopController.createItem);

module.exports = router;
