const express = require('express')
const router = express.Router()

const { isAuthenticate, isSignIn } = require('../controllers/authController')

const {
  createSubCategory,
  getAllSubCategory,
  updateSubCategory,
  getSubCategoryById,
  deleteSubCategory,
  getOneSubcategoryId,
} = require('../controllers/cartController')
const { getUserById } = require('../controllers/userController')

router.param('userId', getUserById)
router.param('cartId', getSubCategoryById)

//Routes
router.post('/create', isSignIn, isAuthenticate, createSubCategory)

router.get('/:cartId', getOneSubcategoryId)

router.put('/:cartId', isSignIn, isAuthenticate, updateSubCategory)

router.delete('/:cartId', isSignIn, isAuthenticate, deleteSubCategory)

module.exports = router
