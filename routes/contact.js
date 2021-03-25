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
} = require('../controllers/contactController');

router.get('/all', isSignIn, isAuthenticate, isAdmin, getAllContact);

router.post('/', createContact);

module.exports = router;
