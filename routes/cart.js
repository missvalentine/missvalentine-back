const express = require('express')
const router = express.Router()

const { isAuth } = require('../controllers/authController')

const {
  getMyCartByCartId,
  addProductToCart,
  removeProductFromCart,
  clearCart,
} = require('../controllers/cartController')
const { getUserById } = require('../controllers/userController')

router.param('userId', getUserById)
// router.param('cartId', getSubCategoryById)

//Routes
router.get('/', isAuth, getMyCartByCartId)
router.post('/add-product', isAuth, addProductToCart)
router.delete('/remove-product', isAuth, removeProductFromCart)
router.put('/clear-cart', isAuth, clearCart)

module.exports = router
