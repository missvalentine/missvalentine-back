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
exports.getEnquiry = (req, res, next) => {
  try {
    return Contact.find({ callScreen: 'enquiry' })
      .populate('products')
      .exec((err, cont) => {
        console.log('getEnquiry', cont);

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
exports.getQuery = (req, res, next) => {
  try {
    return Contact.find({ callScreen: 'contactPage' }).exec((err, cont) => {
      console.log('getQuery', cont);
      if (err) {
        return res.json({
          error: 'Not able to fetch enquiry',
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
exports.getPromotions = (req, res, next) => {
  try {
    return Contact.find({ callScreen: 'footer' }).exec((err, cont) => {
      if (err) {
        return res.json({
          error: 'Not able to fetch enquiry',
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

exports.getContactById = (req, res, next, id) => {
  Contact.findById(id).exec((err, contact) => {
    if (err) {
      return res.json({
        Error: 'contact Not Found',
      });
    }

    req.contact = contact;

    next();
  });
};

exports.deleteContact = (req, res) => {
  const contact = req.contact;
  contact.remove((err, deletedContact) => {
    if (err) {
      return res.json({
        message: 'Not able to Delete Contact',
        success: true,
      });
    }
    return res.json({
      message: 'Contact Deletion SuccessFull',
      success: true,
      data: deletedContact,
    });
  });
};
