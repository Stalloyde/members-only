const express = require('express');
const dbConnection = require('../config/db');
const membersController = require('../controller/membersController');

const router = express.Router();

/* GET home page. */
router.get('/:id', membersController.membersGET);
router.get('/:id/new-message', membersController.membersNewMessageGET);
router.post('/:id/new-message', membersController.membersNewMessagePOST);

module.exports = router;
