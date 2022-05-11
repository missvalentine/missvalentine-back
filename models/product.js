const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 32,
    required: true,
  },
  slug:{
    type: String,
    trim: true,
    maxlength: 32,
    unique: true,
    required: true,
    // fix for missing usernames causing validation fail
    default: function() {
        return this.name.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    }
  },
  shortDesc: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
  // collection: [
  //   {
  //     type: String,
  //   },
  // ],
  subCategories: [
    {
      type: ObjectId,
      ref: 'SubCategory',
    },
  ],
  price: {
    type: Number,
    maxlength: 32,
    trim: true,
    default: 0,
  },
  inStock:{
    type: Number,
    maxlength: 32,
    trim: true,
    default: 10,
  },
  discount: {
    type: Number,
    trim: true,
    default: 0,
  },
  sizes: [
    {
      type: String,
    },
  ],
  coverImage: { data: Buffer, contentType: String },

  images: [{ data: String, contentType: String }],
  colors: [{ type: String }],

  hidden: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
