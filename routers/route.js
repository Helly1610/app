const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user");
const collection_controller = require("../controllers/collection")
router.post("/user_registration", user_controller.user_registration);
router.post("/user_login" , user_controller.user_login);
router.post("/add_amount" , collection_controller.add_amount);

module.exports = router;