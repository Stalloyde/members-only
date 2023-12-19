const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.loginGET = (req, res, next) => {
  res.render('login');
};

// sanitise and validate before authenticate
// generate error.msg in view template
exports.loginPOST = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/members/basic',
});
