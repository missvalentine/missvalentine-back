const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },

  products: [
    {
      type: ObjectId,
      ref: 'Product',
    },
  ],
  subcategories: [
    {
      type: ObjectId,
      ref: 'SubCategory',
    },
  ],
});

module.exports = mongoose.model('Category', CategorySchema);
