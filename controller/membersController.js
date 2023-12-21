const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
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
  // sanistise and validate form inputs
  body('title').trim().escape(),
  body('message').trim().escape(),

  async (req, res, next) => {
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
  },
];
