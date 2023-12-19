const express = require('express');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const dbConnection = require('../config/db');
const loginController = require('../controller/loginController');

const router = express.Router();

/* GET home page. */
router.get('/', loginController.loginGET);
router.post('/', loginController.loginPOST);

module.exports = router;
