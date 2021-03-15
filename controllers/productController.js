const Product = require('../models/product');
const SubCategory = require('../models/subcategory');
const Category = require('../models/category');
const fs = require('fs');
const path = require('path');

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    // .populate('category')
    .exec((err, product) => {
      if (err || !product) {
        return res.json({
          Error: 'No Product Found in Inventory ',
        });
      }
      req.product = product;
      next();
    });
};

exports.getAllProduct = async (req, res, next) => {
  try {
    return await Product.find()
      .populate('subCategories')
      .populate('category')
      .exec((err, products) => {
        if (err) {
          return res.json({
            error: 'Not able to fetch products',
            success: false,
          });
        }
        return res.status(200).json({
          success: true,
          count: products.length,
          data: products,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
  next();
};

exports.getOneProduct = async (req, res, next) => {
  try {
    return await Product.findById(req.product._id)
      .populate('category')
      .populate('subCategories')
      .exec((err, product) => {
        if (err) {
          return res.json({
            error: 'Not able to fetch product',
            success: false,
          });
        }
        return res.status(200).json({
          success: true,
          data: product,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

exports.createProduct = async (req, res, next) => {
  const product = new Product();
  console.log('prod', product);
  var filesArray = req.files;

  filesArray.map((item) => {
    if (item.fieldname == 'images') {
      product.images.push({
        data: fs.readFileSync(item.path).toString('base64'),
        contentType: item.mimetype,
      });
    }
  });

  // product.images = filesArray;
  product.name = req.body.name;
  product.shortDesc = req.body.shortDesc;
  product.description = req.body.description;
  product.category = req.body.category;
  product.price = req.body.price;
  product.hidden = req.body.hidden;
  product.sizes = JSON.parse(req.body.sizes);
  product.colors = JSON.parse(req.body.colors);
  product.subCategories = JSON.parse(req.body.subCategories);

  Category.updateOne(
    { _id: product.category },
    {
      $push: {
        products: product._id,
      },
    }
  ).exec((err, cate) => {
    // console.log('', err, cate);
  });

  SubCategory.updateMany(
    {
      _id: {
        $in: product.subCategories,
      },
    },
    {
      $push: {
        products: product._id,
      },
    }
  ).exec((err, cate) => {
    // console.log('', err, cate);
  });

  product.save((err, prd) => {
    if (err) {
      console.log('err', err);
      return res.json({
        error: 'Not able to Add Product',
        data: product,
        success: false,
      });
    }
    return res.json({ data: prd, success: true });
  });
};
exports.updateProduct = (req, res) => {};
// exports.deleteProduct = (req, res) => {
//   let product = req.product;
//   product.remove.exec((err, products) => {
//     if (err) {
//       return res.json({
//         error: ' not Deleted',
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: 'Deleted Successfully',
//     });
//   });
// };
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.json({
        err,
        Error: 'Product is not removed from DB',
      });
    }
    // product.photo = undefined;
    res.json({
      Msg: 'Product Removed Successfull',
      productDetails: product,
    });
  });
};
