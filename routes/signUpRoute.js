const express = require('express');
const dbConnection = require('../database/db');
const signUpController = require('../controller/signUpController');

const router = express.Router();

/* GET home page. */
router.get('/', signUpController.signUp);

module.exports = router;
