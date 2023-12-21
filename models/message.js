const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const messageSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  datePosted: { type: Date },
});

messageSchema.virtual('datePostedFormattedVIP').get(function () {
  return DateTime.fromJSDate(this.datePosted).toLocaleString(DateTime.DATE_MED);
});

messageSchema.virtual('datePostedFormattedMOD').get(function () {
  return DateTime.fromJSDate(this.datePosted).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('Message', messageSchema);
