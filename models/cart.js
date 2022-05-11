const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const CartSchema = new Schema({
  status: {
    type: String,
    trim: true,
    maxlength: 32,
    required: true,
  },
  quantity: {
    type: Number,
    maxlength: 32,
    trim: true,
    default: 0,
  },
  totalAmount: {
    type: Number,
    maxlength: 32,
    trim: true,
    default: 0,
  },
  products: [
    {
      product: {
        type: ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        maxlength: 32,
        default: 0,
      },
    },
  ],
})

module.exports = mongoose.model('Cart', CartSchema)
