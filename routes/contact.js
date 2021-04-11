const express = require('express');
const router = express.Router();

const {
  isAdmin,
  isAuthenticate,
  isSignIn,
} = require('../controllers/authController');

const {
  createContact,
  getAllContact,
  getQuery,
  getEnquiry,
  getPromotions,
  getContactById,
  deleteContact,
} = require('../controllers/contactController');
const { getUserById } = require('../controllers/userController');

router.param('userId', getUserById);
router.param('contactId', getContactById);

router.get('/all/:userId', isSignIn, isAuthenticate, isAdmin, getAllContact);
router.get('/query/:userId', isSignIn, isAuthenticate, isAdmin, getQuery);
router.get('/enquiry/:userId', isSignIn, isAuthenticate, isAdmin, getEnquiry);
router.get(
  '/promotions/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  getPromotions
);

router.delete(
  '/:contactId/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  deleteContact
);

router.post('/', createContact);

module.exports = router;
