const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/users');

exports.membersBasicGET = (req, res, next) => {
  res.render('membersBasic');
};
