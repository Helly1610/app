const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

router.post("/user_registration", controller.user_registration);
router.post("/user_login" , controller.user_login);


module.exports = router;