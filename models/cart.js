const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const CartItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less then 1.'],
  },
  price: {
    type: Number,
    required: true,
  },
})
module.exports = mongoose.model('CartItem', CartItemSchema)

const CartSchema = new Schema(
  {
    status: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
      default: 'active',
    },
    products: [CartItemSchema],
  },
  { timestamps: true },
)

module.exports = mongoose.model('Cart', CartSchema)
