const express = require('express');
const dbConnection = require('../config/db');
const membersController = require('../controller/membersController');
const { isAuth } = require('./authenticate');

const router = express.Router();

/* GET home page. */
router.get('/:name', isAuth, membersController.membersGET);
router.get('/:name/new-message', isAuth, membersController.membersNewMessageGET);
router.post('/:name/new-message', isAuth, membersController.membersNewMessagePOST);

module.exports = router;
