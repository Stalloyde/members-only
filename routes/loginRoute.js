const express = require('express');
const dbConnection = require('../config/db');
const loginController = require('../controller/loginController');

const router = express.Router();

/* GET home page. */
router.get('/', loginController.login);

module.exports = router;
