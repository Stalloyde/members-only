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
  passport.authenticate('local', {
    successRedirect: '/members/basic',
    failureRedirect: '/login',
    failureFlash: true,
  }),

];
