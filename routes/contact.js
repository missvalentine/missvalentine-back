const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');

router.get('/', (req, res) => {
  console.log('working');
  Contact.find()
    .then((data) =>
      res.status(200).json({ data, message: 'Contact fetched Successfully' })
    )
    .catch((err) => res.status(404).json({ message: err.message }));
});

router.post('/', (req, res) => {
  console.log(req.body);
  let address = new Contact(req.body);
  address
    .save()
    .then((data) =>
      res.status(200).json({ message: 'Addresses Added Successfully' })
    )
    .catch((err) => res.status(404).json({ message: err.message }));
});

module.exports = router;
