const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require('../models/users');
const Message = require('../models/message');

exports.membersGET = async (req, res, next) => {
  const [currentUser, messages] = await Promise.all([
    User.findById(req.user.id),
    Message.find().populate('user').sort({ datePosted: -1 }),
  ]);

  res.render('membersPage', {
    currentUser, messages, loggedIn: true, isVip: currentUser.isVip, isMod: currentUser.isMod,
  });
};

exports.membersNewMessageGET = async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);

  res.render('membersNewMessage', {
    currentUser, loggedIn: true, isVip: currentUser.isVip, isMod: currentUser.isMod,
  });
};

exports.membersNewMessagePOST = [
  body('title').trim().escape(),
  body('message').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const currentUser = await User.findById(req.user.id);
    const newMessage = new Message({
      user: currentUser,
      title: req.body.title,
      message: req.body.message,
      datePosted: Date(),
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('membersNewMessage', {
        currentUser, loggedIn: true, isVip: currentUser.isVip, isMod: currentUser.isMod,
      });
    } else {
      await newMessage.save();
      res.redirect(`/members/${currentUser.username}`);
    }
  }),
];

exports.membersVipSignupGET = async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  const errorMessages = req.flash();

  res.render('membersVipSignUp', {
    currentUser, loggedIn: true, isVip: currentUser.isVip, isMod: currentUser.isMod, errorMessages,
  });
};

exports.membersVipSignupPOST = [
  body('isVip')
    .customSanitizer((input) => Boolean(input)),
  body('password').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const currentUser = await User.findById(req.user.id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('membersVipSignUp', {
        currentUser,
        loggedIn: true,
        isVip: currentUser.isVip,
        isMod: currentUser.isMod,
        errors: errors.array(),
      });
    }
    next();
  }),

  passport.authenticate('local', {
    failureRedirect: '/members/member/vip-signup',
    failureFlash: true,
  }),
  async (req, res) => {
    const updatedUser = new User({
      id: req.user.id,
      username: req.user.username,
      password: req.user.password,
      isVip: req.body.isVip,
      isMod: req.user.isMod,
    });
    console.log(updatedUser);
    await User.findByIdAndUpdate(req.user.id, updatedUser);
    res.redirect(`/members/${updatedUser.username}`);
  },
];
