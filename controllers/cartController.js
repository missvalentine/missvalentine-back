const Cart = require('../models/cart')
const Product = require('../models/product')

exports.getMyCartByCartId = async (req, res, next) => {
  try {
    return await Cart.findById(req.profile.cart)
      .populate('products.product')
      .populate('products.product.category')
      .exec((err, cart) => {
        if (err) {
          return res.json({
            error: 'Not able to fetch cart items.',
            success: false,
          })
        }
        return res.status(200).json({
          success: true,
          data: cart,
        })
      })
  } catch (error) {
    console.error('[Get Cart] [Error] ', error)
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}
exports.addProductToCart = async (req, res, next) => {
  try {
    //TODO Improve add logic
    const { productId, quantity, color, size } = req.body
    let mycart = await Cart.findOne({ _id: req.profile.cart })
    const fetchedProduct = await Product.findById(productId)

    if (mycart)
      if (mycart && fetchedProduct) {
        //cart exists for user
        const name = fetchedProduct.name
        const price = fetchedProduct.price || 0
        let itemIndex = mycart.products.findIndex(
          (p) => p.product == productId && p.color === color && p.size === size,
        )
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = mycart.products[itemIndex]
          productItem.quantity = quantity
          mycart.products[itemIndex] = productItem
        } else {
          //product does not exists in cart, add new item
          mycart.products.unshift({
            product: productId,
            quantity,
            price,
            size,
            color,
          })
        }
        mycart = await mycart.save()

        return res.status(200).json({
          success: true,
          cart: mycart,
          message: `${name} added `,
        })
      } else {
        //no cart for user, create new cart
        return res.status(500).json({
          success: false,
          error: 'Something went Wrong! Please contact Customer Care',
        })
      }
  } catch (error) {
    console.log('[Add To cart] [Error]', error)
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    })
  }
}

exports.clearCart = async (req, res) => {
  try {
    const mycart = await Cart.findByIdAndUpdate(req.profile.cart, {
      $set: {
        products: [],
      },
    })
    if (mycart)
      return res.status(200).json({
        success: true,
        data: mycart,
        message: 'Cart Cleared SuccessFully',
      })
    else
      return res.status(402).json({
        message: 'Cart cant be  wrong',
        success: false,
      })
  } catch {
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    })
  }
}

exports.removeProductFromCart = (req, res) => {
  try {
    console.log('productId', req.body.productId)
    const { productId, size, color } = req.body
    Cart.findOneAndUpdate(
      { _id: req.profile.cart },
      {
        $pull: {
          products: { product: productId, size, color },
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
