const express = require('express');
const router = express.Router();

const { register, getUser, updateUser } = require("../controllers/auth");

// user routers
router.route("/register").post(register);
router.route("/register/:id").get(getUser).patch(updateUser);

module.exports = router;