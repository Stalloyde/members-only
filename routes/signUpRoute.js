const express = require('express');
const dbConnection = require('../config/db');
const signUpController = require('../controller/signUpController');

const router = express.Router();

/* GET home page. */
router.get('/', signUpController.signUpGET);
router.post('/', signUpController.signUpPOST);

module.exports = router;
