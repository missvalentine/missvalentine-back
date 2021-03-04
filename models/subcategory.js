const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const SubCategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
