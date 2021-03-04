const express = require('express');
const router = express.Router();

const {
  isAdmin,
  isAuthenticate,
  isSignIn,
} = require('../controllers/authController');

const {
  getCategoryById,
  getCategory,
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { getUserById } = require('../controllers/userController');

router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

//Routes
router.post(
  '/create/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  createCategory
);
router.get('/all', getAllCategory);

router.get('/:categoryId', getCategory);

router.put(
  '/:categoryId/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  updateCategory
);

router.delete(
  '/:categoryId/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  deleteCategory
);

module.exports = router;
