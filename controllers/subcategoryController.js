const SubCategory = require('../models/subcategory');
const Category = require('../models/category');

exports.getSubCategoryById = (req, res, next, id) => {
  SubCategory.findById(id).exec((err, cate) => {
    if (err) {
      return res.json({
        Error: 'SubCategory Not Found',
      });
    }
    req.subcategory = cate;

    next();
  });
};

exports.getAllSubCategory = (req, res) => {
  SubCategory.find()
    .populate('category')
    .exec((err, subcategories) => {
      if (err) {
        return res.json({
          error: 'Not able to fetch Categories',
          success: false,
        });
      }
      return res.json({ data: subcategories, success: true });
    });
};

exports.createSubCategory = (req, res) => {
  const subcategory = new SubCategory(req.body);

  Category.updateOne(
    { _id: req.body.category },
    {
      $push: {
        subcategories: subcategory._id,
      },
    }
  ).exec((err, cate) => {
    console.log('hello', err, cate);
  });

  subcategory.save((err, cate) => {
    if (err) {
      return res.json({
        error: 'Not able to Add Category',
        success: false,
      });
    }
    return res.json({ data: cate, success: true });
  });
};

exports.deleteSubCategory = (req, res) => {
  const subcategory = req.subcategory;
  subcategory.remove((err, deletedCategory) => {
    if (err) {
      return res.json({
        error: 'Not able to Delete SubCategory',
        success: false,
      });
    }
    return res.json({
      success: true,
      messsage: 'SubCategory Deletion SuccessFull',
    });
  });
};
