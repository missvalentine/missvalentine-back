const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 32,
  },
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
  subject: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  text: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);
