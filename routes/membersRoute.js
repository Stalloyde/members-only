const express = require('express');
const dbConnection = require('../config/db');
const membersController = require('../controller/membersController');

const router = express.Router();

/* GET home page. */
router.get('/:id/basic', membersController.membersBasicGET);

module.exports = router;
