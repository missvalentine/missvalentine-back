const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: [3, 'Name can not be less than 3'],
    max: [40, 'Name can not be more than 40'],
  },
  phone: {
    type: String,
    required: true,
    min: [8, 'Phone can not be less than 8'],
    max: [15, 'Phone can not be more than 15'],
  },
  streetAddress: {
    type: String,
    required: true,
    min: [5, 'Street Address can not be less than 5'],
    max: [40, 'Street Address can not be more than 40'],
  },
  streetAddressAlternative: {
    type: String,
    min: [5, 'Street Address can not be less than 5'],
    max: [40, 'Street Address can not be more than 40'],
  },
  city: {
    type: String,
    min: [3, 'Street Address can not be less than 3'],
    max: [40, 'Street Address can not be more than 40'],
  },
  state: {
    type: String,
    min: [3, 'State can not be less than 3'],
    max: [40, 'State can not be more than 40'],
  },
  country: {
    type: String,
    min: [3, 'Country can not be less than 3'],
    max: [40, 'Country can not be more than 40'],
    default: 'India',
  },
  pincode: {
    type: String,
    min: [3, 'Postcode can not be less than 3'],
    max: [10, 'Postcode can not be more than 10'],
  },
  label: {
    type: String,
    min: [3, 'Home can not be less than 3'],
    max: [10, 'Home can not be more than 10'],
    default: 'Home',
  },
})
module.exports = mongoose.model('Address', AddressSchema)
