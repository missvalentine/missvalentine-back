var mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const bcrypt = require('bcryptjs')

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    phoneNo: {
      type: Number,
      trim: true,
      required: true,
      unique: true,
      maxlength: 10,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    authSource: {
      type: String,
      default: 'own',
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    wishlist: {
      ref: 'Wishlist',
      type: ObjectId,
    },
    cart: {
      ref: 'Cart',
      type: ObjectId,
    },
    orders: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
)

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password

    this.encry_password = this.securePassword(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  authenticate: function (plainpassword) {
    return bcrypt.compareSync(plainpassword, this.encry_password)
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return 'error'
    try {
      return bcrypt.hashSync(plainpassword, 10)
    } catch (err) {
      return err
    }
  },
}

module.exports = mongoose.model('User', userSchema)
