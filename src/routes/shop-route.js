const express = require("express");

const authenticate = require("../middlewares/authenticate");
const shopController = require("../controllers/shop-controller");

const router = express.Router();

router.post("/", authenticate, shopController.createItem);
router.get("/:shopId", shopController.getAllItem);
router.patch("/:shopId", shopController.updateItem);
router.delete("/:shopId/:itemId", authenticate, shopController.deleteItem);
router.get("/owner/:shopId", shopController.getShopOwner);

module.exports = router;
