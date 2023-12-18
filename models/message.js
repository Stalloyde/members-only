const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  message: { Type: String, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
