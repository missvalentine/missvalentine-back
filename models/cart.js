const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required.'],
    min: [1, 'Quantity can not be less then 1.'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
  },
  color: {
    type: String,
    required: [true, 'Color is required.'],
  },
  size: {
    type: String,
    required: [true, 'Size is required.'],
  },
})

CartItemSchema.index({ product: 1, color: 1, size: 1 }, { unique: true })

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
