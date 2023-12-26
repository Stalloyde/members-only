const express = require('express');
const dbConnection = require('../config/db');
const membersController = require('../controller/membersController');
const { isAuth } = require('./authenticate');

const router = express.Router();

/* GET home page. */
router.get('/:name', isAuth, membersController.membersGET);
router.get('/:name/new-message', isAuth, membersController.membersNewMessageGET);
router.post('/:name/new-message', isAuth, membersController.membersNewMessagePOST);
router.get('/:name/vip-signup', isAuth, membersController.membersVipSignupGET);
router.post('/:name/vip-signup', isAuth, membersController.membersVipSignupPOST);
router.get('/:name/mod-signup', isAuth, membersController.membersModSignupGET);
router.post('/:name/mod-signup', isAuth, membersController.membersModSignupPOST);
router.get('/:name/:id/delete', isAuth, membersController.membersDeletePostGET);
router.post('/:name/:id/delete', isAuth, membersController.membersDeletePostPOST);

module.exports = router;
