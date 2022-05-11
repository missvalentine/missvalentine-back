const express = require('express')

const router = express.Router()

const { check, validationResult } = require('express-validator')
const {
  signout,
  register,
  login,
  isSignIn,
} = require('../controllers/authController')

router.post(
  '/register',
  [
    check('name', 'Name should be at least 3 characters').isLength({ min: 3 }),
    check('email', 'Email is required').isEmail(),
    check('phoneNo', 'Phone Number is not valid')
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
    check('password', 'Password should be at least 8 characters').isLength({
      min: 8,
    }),
  ],
  register,
)

router.post(
  '/login',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password field is required').isLength({ min: 1 }),
  ],
  login,
)

router.get('/signout', signout)

router.get('/testroute', isSignIn, (req, res) => {
  res.send('A protected route')
})

module.exports = router
