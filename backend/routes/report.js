const express = require('express');
const router = express.Router();
const auth = require("../middleware/authentication");
const createReport = require('../controllers/report');



// router.use(auth);
router.route('/').post(createReport);



module.exports = router;