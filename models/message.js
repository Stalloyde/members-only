const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: { type: String, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
