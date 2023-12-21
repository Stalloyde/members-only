const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/users');

exports.loginGET = (req, res, next) => {
  const errorMessages = req.flash();
  res.render('login', { errorMessages });
};

exports.loginPOST = [
  body('username').trim().escape(),
  body('password').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.redirect('/login', { errors: errors.array() });
    }
    next();
  }),

  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  (req, res) => res.redirect(`/members/${req.user.username}`),
];
