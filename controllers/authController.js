const User = require('../models/user')
const Cart = require('../models/cart')

const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.register = (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    })
  }

  const user = new User(req.body)
  const cart = new Cart()

  cart.save()
  user.cart = cart._id

  user.save((err, user) => {
    if (err) {
      return res.status(501).json({
        err: err,
      })
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
      id: user._id,
    })
  })
}

//

exports.login = (req, res) => {
  const errors = validationResult(req)

  const { email, password } = req.body

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    })
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'User does not exists',
        success: false,
      })
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        message: 'Email and password do not match',
        success: false,
      })
    }
    const {
      authSource,
      role,
      orders,
      _id,
      email,
      name,
      lastname,
      phoneNo,
      cart,
      createdAt,
      updatedAt,
      addresses,
      wishlist,
    } = user

    //create token
    const token = jwt.sign(
      { userId: _id },
      process.env.SECRET || 'MissValentine',
    )
    //put token in cookie
    // res.cookie('token', token, { expire: new Date() + 9999 })

    //send response to front end

    console.log('user', user)
    return res.json({
      token,
      user: {
        authSource,
        role,
        orders,
        _id,
        email,
        name,
        lastname,
        phoneNo,
        cart,
        createdAt,
        updatedAt,
        addresses,
        wishlist,
      },
      success: true,
      message: 'Sign In successfully',
    })
  })
}

exports.signout = (req, res) => {
  res.clearCookie('token')
  res.json({
    message: 'User signout Successfully',
  })
}

exports.isSignIn = expressJwt({
  secret: process.env.SECRET || 'MissValentine',
  userProperty: 'auth',
  algorithms: ['HS256'],
})

exports.isAuth = async (req, res, next) => {
  const bearerToken = req.header('authorization')
  if (!bearerToken || typeof bearerToken === undefined) {
    return res.status(403).send('A token is required for authentication')
  }

  const token = bearerToken.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.SECRET || 'MissValentine')
    req.user = decoded
    User.findById(decoded.userId)
      .populate('addresses')
      .exec((err, user) => {
        const {
          authSource,
          role,
          orders,
          _id,
          email,
          lastname,
          name,
          phoneNo,
          cart,
          createdAt,
          updatedAt,
          addresses,
          wishlist,
        } = user

        req.profile = {
          authSource,
          role,
          orders,
          _id,
          email,
          name,
          lastname,
          phoneNo,
          cart,
          createdAt,
          updatedAt,
          addresses,
          wishlist,
        }
        console.log('[INFO] [isAuth] ', _id, ' ', email)
        next()
      })
  } catch (err) {
    console.log('[ERROR] [isAuth] ', err)
    return res.status(403).json({
      message: 'Invalid Authorization Token',
      success: false,
    })
  }
}

exports.isAuthenticate = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id

  // console.log("isAuthenticate", req.profile, req.auth)
  // User.findOne({ email }, (err, user) => {
  //   if (err || !user) {
  //     return res.status(400).json({
  //       message: 'User does not exists',
  //       success: false,
  //     })
  //   }
  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED , Not Auth',
    })
  }

  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.json({
      error: 'ACCESS DENIEND : NOT ADMIN',
    })
  }
  next()
}
