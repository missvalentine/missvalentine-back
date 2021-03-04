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
  // deleteCategory,
} = require('../controllers/subcategoryController');
const { getUserById } = require('../controllers/userController');

router.param('userId', getUserById);

//Routes
router.post(
  '/create/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  createSubCategory
);

router.get('/all', getAllSubCategory);
module.exports = router;
