const Contact = require('../models/contact');

exports.getAllContact = (req, res, next) => {
  try {
    return Contact.find().exec((err, cont) => {
      if (err) {
        return res.json({
          error: 'Not able to fetch contacts',
          success: false,
        });
      }
      return res.status(200).json({
        success: true,
        count: cont.length,
        data: cont,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

exports.createContact = (req, res) => {
  const contact = new Contact(req.body);
  contact.save((err, cate) => {
    if (err) {
      return res.json({
        error: 'Not able to send Query',
        success: false,
      });
    }
    return res.json({ data: cate, success: true, msg: 'Request Sent!' });
  });
};
