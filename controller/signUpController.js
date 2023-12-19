const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/users');

exports.signUpGET = (req, res, next) => {
  res.render('signUp');
};

exports.signUpPOST = [
  body('username').trim().escape(),
  body('password').trim().escape(),
  body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('The passwords do not match'),

  asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      return hashedPassword;
    });

    const newUser = new User({
      username: req.body.username,
      password: bcrypt.hashedPassword,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('signUp', { errors: errors.array(), user: newUser });
    } else {
      await newUser.save();
      res.render('login');
    }
  }),
];
