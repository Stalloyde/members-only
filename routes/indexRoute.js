const express = require('express');
const dbConnection = require('../config/db');
const indexController = require('../controller/indexController');

const router = express.Router();

/* GET home page. */
router.get('/', indexController.homepage);
router.get('/logout', indexController.logout);

module.exports = router;
