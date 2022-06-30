const User = require('../models/user')
const Address = require('../models/address')

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      res.status(400).json({
        err: 'No user Found',
      })
    }

    req.profile = user
    next()
  })
}

exports.getUser = (req, res) => {
  req.profile.updatedAt = undefined
  req.profile.encry_password = undefined

  return res.json(req.profile)
}

exports.getProfile = (req, res) => {
  User.findById(req.profile._id)
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

      console.log('user', user)
      const userToSend = {
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
      }

      if (err)
        return res.status(402).json({
          message: 'cant fetch user profile',
        })
      return res.status(200).json({
        data: userToSend,
        message: 'User profile fetched',
      })
    })
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.json({ Error: 'Updation Denied' })
      }
      user.updatedAt = undefined
      user.encry_password = undefined
      res.json(user)
    },
  )
}

exports.addAddress = (req, res) => {
  try {
    const { name, city, label, phone, pincode, state, streetAddress } = req.body
    const addressObj = {
      name,
      city,
      label,
      phone,
      pincode,
      state,
      streetAddress,
    }
    const address = new Address(addressObj)
    address.save()
    console.log('address', address._id)

    User.findByIdAndUpdate(req.profile._id, {
      $push: {
        addresses: address._id,
      },
    }).exec((err, user) => {
      if (err) {
        return res.status(402).json({
          error: err,
          message: 'New Address not added',
        })
      }
      return res.status(200).json({
        data: address,
        message: 'New Address added successfully',
      })
    })
  } catch (err) {
    console.log('[ERROR] [Add Address] ', err)
    return res.status(501).json({
      message: 'Invalid Address details',
      success: false,
    })
  }
}
exports.updateAddress = async (req, res) => {
  try {
    const { address_id } = req.query
    if (!address_id)
      return res.status(400).json({
        message: 'Address Id missing in Request',
        success: false,
      })

    const { name, city, label, phone, pincode, state, streetAddress } = req.body

    const _address = await Address.findById(address_id)

    if (name) _address.name = name
    if (phone) _address.phone = phone
    if (streetAddress) _address.streetAddress = streetAddress
    if (city) _address.city = city
    if (state) _address.state = state
    if (pincode) _address.pincode = pincode
    if (label) _address.label = label

    _address.save((err, _newAddress) => {
      if (err) {
        return res.status(402).json({
          error: err,
          message: "Address can't be updated",
        })
      }
      return res.status(200).json({
        data: _newAddress,
        message: 'Address updated successfully',
      })
    })
  } catch (err) {
    console.log('[ERROR] [Update Address] ', err)
    return res.status(500).json({
      message: 'Invalid Address details',
      success: false,
    })
  }
}

exports.getAddress = (req, res) => {
  try {
    const { address_id } = req.query
    if (!address_id)
      return res.status(400).json({
        message: 'Address Id missing in Request',
        success: false,
      })
    Address.findById(address_id).exec((err, address) => {
      const {
        country,
        label,
        _id,
        name,
        city,
        phone,
        state,
        streetAddress,
        pincode,
      } = address

      const addressToSend = {
        country,
        label,
        _id,
        name,
        city,
        phone,
        state,
        streetAddress,
        pincode,
      }

      if (err)
        return res.status(402).json({
          message: 'cant fetch address details',
          success: false,
        })
      return res.status(200).json({
        data: addressToSend,
        message: 'Address details fetched',
        success: true,
      })
    })
  } catch (err) {
    console.log('[ERROR] [Get Address] ', err)
    return res.status(501).json({
      message: 'Invalid Address details',
      success: false,
    })
  }
}

exports.deleteAddress = (req, res) => {
  try {
    const { address_id } = req.query
    if (!address_id)
      return res.status(400).json({
        message: 'Address Id missing in Request',
        success: false,
      })

    User.findByIdAndUpdate(
      { _id: req.profile._id },
      {
        $pull: {
          addresses: address_id,
          // addresses: { address: address_id },
        },
      },
      { new: true, useFindAndModify: false },
      (err, _newAddress) => {
        if (err)
          return res.status(402).json({
            message: 'cant delete address details',
            success: false,
          })
        return res.status(200).json({
          message: 'Address Deleted',
          success: true,
        })
      },
    )
  } catch (err) {
    console.log('[ERROR] [Delete Address] ', err)
    return res.status(501).json({
      message: 'Invalid Address details',
      success: false,
    })
  }
}
