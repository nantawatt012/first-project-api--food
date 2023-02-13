const express = require("express");

const authenticate = require("../middlewares/authenticate");
const shopController = require("../controllers/shop-controller");

const router = express.Router();

router.get("/:shopId", shopController.getAllItem);
router.post("/", authenticate, shopController.createItem);
router.patch("/:shopId", shopController.updateItem);
router.delete("/:shopId/:itemId", authenticate, shopController.deleteItem);
router.get("/owner/:shopId", shopController.getShopOwner);

router.post("/addToCart", authenticate, shopController.addItem);

module.exports = router;
