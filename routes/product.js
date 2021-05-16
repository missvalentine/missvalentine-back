const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  isAdmin,
  isAuthenticate,
  isSignIn,
} = require('../controllers/authController');

const {
  getAllProduct,
  createProduct,
  // updateProduct,
  deleteProduct,
  getProductById,
  getOneProduct,
} = require('../controllers/productController');
const { getUserById } = require('../controllers/userController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + '/uploads'));
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (
      ext !== '.png' &&
      ext !== '.jpg' &&
      ext !== '.jpeg'
      // ext !== '.pdf' &&
      // ext !== '.webp'
    ) {
      req.fileValidationError = 'Forbidden extension';
      return callback(null, false, req.fileValidationError);
    }
    callback(null, true);
  },
  limits: {
    // fileSize: 420 * 150 * 200,
    fileSize: '2MB',
  },
});

router.get('/all', getAllProduct);

router.param('productId', getProductById);
router.param('userId', getUserById);

router.get('/:productId', getOneProduct);

router.post(
  '/create/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  upload.array('images', 20),
  // upload.any(),
  createProduct
);

// router.put(
//   '/:productId/:userId',
//   isSignIn,
//   isAuthenticate,
//   isAdmin,
//   updateProduct
// );

router.delete(
  '/:productId/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  deleteProduct
);

module.exports = router;
