const express = require('express')

const router = express.Router()

const {
  isAdmin,
  isAuth,
  isSignIn,
  isAuthenticate,
} = require('../controllers/authController')

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
  getProfile,
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
} = require('../controllers/userController')

const {
  getUserWishlist,
  clearWishlist,
  addProductToWishlist,
} = require('../controllers/wishlistController')

router.param('userId', getUserById)
router.get('/profile', isAuth, getProfile)

router.get('/user/:userId', isSignIn, isAuthenticate, getUser)
router.put('/user/:userId', isSignIn, isAuthenticate, updateUser)

//Addresses
router.get('/get-address', isAuth, getAddress)
router.post('/add-address', isAuth, addAddress)
router.put('/update-address', isAuth, updateAddress)
router.delete('/delete-address', isAuth, deleteAddress)
// router.get('/get-all-addresses', isAuth, getAllAddresses)

//Wishlist
router.get('/get-wishlist', isAuth, getUserWishlist)
router.put('/clear-wishlist', isAuth, clearWishlist)
router.post('/add-item-to-wishist', isAuth, addProductToWishlist)
// router.delete('/remove-product', isAuth, removeProductFromCart)

module.exports = router
