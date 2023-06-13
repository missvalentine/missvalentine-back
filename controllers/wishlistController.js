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
    return User.updateOne(
      { _id: req.profile._id, wishlist: { $ne: productId } },
      {
        $addToSet: {
          wishlist: productId,
        },
      },
    )
      .then((user) => {
        console.log('user', user)
        return res.status(200).json({
          success: true,
          // wishlist: user,
          message: `Item wishlisted `,
        })
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          error: 'Something went Wrong! Please contact Customer Care',
        })
      })
  } catch (error) {
    console.log('[Add To cart] [Error]', error)
    return res.status(500).json({
      success: false,
      error: 'Something went Wrong! Please contact Customer Care',
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

exports.removeProductFromWishlist = (req, res) => {
  try {
    const { productId } = req.body
    User.findByIdAndUpdate(
      req.profile._id,
      {
        $pull: {
          wishlist: productId,
        },
      },
      false,
      (err, wishlist) => {
        if (!err) {
          return res.status(200).json({
            success: true,
            data: wishlist,
            message: 'Item removed SuccessFully',
          })
        } else {
          return res.status(500).json({
            message: 'Something went wrong',
            success: false,
          })
        }
      },
    )

    // mycart = await mycart.save()
  } catch (error) {
    console.log('[Remove from wishlist] [Error]', error)
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    })
  }
}
