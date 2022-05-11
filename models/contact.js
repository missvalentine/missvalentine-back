const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  storeName: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  phone: {
    type: Number,
    maxlength: 10,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  address: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  callScreen: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  city: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  state: {
    type: String,
    trim: true,
    maxlength: 32,
  },
  queryType: {
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
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Contact', contactSchema)
