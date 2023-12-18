const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String, required: true,
  },
  password: {
    type: String, required: true,
  },
  messages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  isMember: Boolean,
  isAdmin: Boolean,
});

UserSchema.virtual('url').get(function () {
  return `/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);
