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

router.get('/all', getAllSubCategory);

router.delete(
  '/:subcategoryId/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  deleteSubCategory
  // (req, res) => {
  //   console.log('pls del');
  // }
);

module.exports = router;
