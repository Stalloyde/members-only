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
  body('isVip')
    .customSanitizer((input) => Boolean(input)),
  body('password').trim().escape(),
  body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('The passwords do not match'),

  asyncHandler(async (req, res, next) => {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      isVip: req.body.isVip,
      isMod: false,
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('signUp', { errors: errors.array(), user: newUser });
    } else {
      const users = await User.find({ username: newUser.username });
      if (users.length > 0) {
        res.render('signUp', { duplicateError: 'Username has been taken. Try another' });
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
          if (err) {
            return next(err);
          }

          newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            isVip: req.body.isVip,
            isMod: false,
          });

          await newUser.save();
        });

        res.redirect('/login');
      }
    }
  }),
];
