const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  email: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  phone: {
    type: Number,
    maxlength: 10,
    trim: true,
  },
  callScreen: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  type: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);
