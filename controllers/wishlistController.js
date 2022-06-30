const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const Cart = require('../models/cart')
const Product = require('../models/product')
const User = require('../models/user')

exports.getUserWishlist = async (req, res, next) => {
  try {
    console.log('wish', req.profile.wishlist)
    const productIdList = req.profile.wishlist?.map((_wishlistId) =>
      ObjectId(_wishlistId),
    )
    return await Product.find({
      _id: {
        $in: productIdList,
      },
    })
      // .populate('product')
      .exec((err, _wishlist) => {
        if (err) {
          return res.json({
            error: 'Not able to fetch Wishlist',
            success: false,
          })
        }
        return res.status(200).json({
          success: true,
          data: _wishlist,
        })
      })
  } catch (error) {
    console.error('[Get Wishlist] [Error] ', error)
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}
exports.addProductToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body

    User.updateOne(
      { _id: req.profile._id },
      {
        $push: {
          wishlist: productId,
        },
      },
    ).exec((err, wishlist) => {
      if (err)
        return res.status(402).json({
          success: false,
          error: 'Something went Wrong! Please contact Customer Care',
        })
      return res.status(200).json({
        success: true,
        cart: wishlist,
        message: `Item wishlisted `,
      })
    })
  } catch (error) {
    console.log('[Add To cart] [Error]', error)
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}

exports.clearWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.profile._id, {
      $set: {
        wishlist: [],
      },
    })
    if (user)
      return res.status(200).json({
        success: true,
        data: user,
        message: 'Wishlist Cleared SuccessFully',
      })
  } catch (err) {
    console.log('[Wishlist] ', err)
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    })
  }
}

exports.removeProductFromCart = (req, res) => {
  try {
    console.log('productId', req.body.productId)

    Cart.findByIdAndUpdate(
      req.profile.cart,
      {
        $pull: {
          products: { product: req.body.productId },
        },
      },
      false,
      (err, cart) => {
        if (!err) {
          return res.status(200).json({
            success: true,
            data: cart,
            message: 'Item removed SuccessFully',
          })
        }
      },
    )

    // mycart = await mycart.save()
  } catch (error) {
    console.log('[Remove from cart] [Error]', error)
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    })
  }
}
