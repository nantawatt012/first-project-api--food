const express = require("express");

const homeController = require("../controllers/home-controller");

const router = express.Router();

router.get("/getItemFood", homeController.getItemFood);

module.exports = router;
