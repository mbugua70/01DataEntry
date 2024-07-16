const express = require('express');
const router = express.Router();

const { register, getUser } = require("../controllers/auth");

// user routers
router.route("/register").post(register);
router.route("/register/:id").get(getUser);

module.exports = router;