const express = require('express');
const router = express.Router();

const {
  isAdmin,
  isAuthenticate,
  isSignIn,
} = require('../controllers/authController');

const {
  createSubCategory,
  getAllSubCategory,
  // updateCategory,
  getSubCategoryById,
  deleteSubCategory,
  getOneSubcategoryId,
} = require('../controllers/subcategoryController');
const { getUserById } = require('../controllers/userController');

router.param('userId', getUserById);
router.param('subcategoryId', getSubCategoryById);

//Routes
router.post(
  '/create/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  createSubCategory
);

router.get('/:subcategoryId', getOneSubcategoryId);

router.get('/all', getAllSubCategory);

router.delete(
  '/:subcategoryId/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  deleteSubCategory
);

module.exports = router;
