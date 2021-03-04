const SubCategory = require('../models/subcategory');
const Category = require('../models/category');

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
