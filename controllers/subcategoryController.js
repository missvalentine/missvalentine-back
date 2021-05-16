const SubCategory = require('../models/subcategory');
const Category = require('../models/category');

exports.getSubCategoryById = (req, res, next, id) => {
  SubCategory.findById(id).exec((err, cate) => {
    if (err || !cate) {
      return res.json({
        message: 'No SubCategory Found ',
        success: false,
      });
    }
    req.subcategory = cate;
    next();
  });
};
exports.getOneSubcategoryId = async (req, res, next) => {
  try {
    console.log(req);
    return await SubCategory.findById(req.subcategory._id)
      .populate('products')
      .exec((err, sCate) => {
        if (err) {
          return res.json({
            error: 'Not able to fetch subcategory',
            success: false,
          });
        }
        return res.status(200).json({
          success: true,
          data: sCate,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
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
  try {
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
          message: 'Not able to Add SubCategory',
          success: false,
        });
      }
      return res.json({
        data: cate,
        success: true,
        message: 'SubCategory Added Successfully',
      });
    });
  } catch {
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

exports.deleteSubCategory = (req, res) => {
  const subcategory = req.subcategory;
  try {
    subcategory.remove((err, deletedCategory) => {
      if (err) {
        return res.json({
          message: 'Not able to Delete SubCategory',
          success: false,
        });
      }
      return res.json({
        success: true,
        message: 'SubCategory Deletion SuccessFull',
      });
    });
  } catch {
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

exports.updateSubCategory = (req, res) => {
  const subcategory = req.subcategory;
  subcategory.name = req.body.name;
  if (req.body.category !== subcategory.category) {
    Category.updateOne(
      { _id: req.body.category },
      {
        $push: {
          subcategories: subcategory._id,
        },
      }
    ).exec((err, cate) => {
      console.log('adding sc to new c', err, cate);
    });
    Category.updateOne(
      { _id: subcategory.category },
      {
        $pull: {
          subcategories: subcategory._id,
        },
      }
    ).exec((err, cate) => {
      console.log('removing sc from prev c', err, cate);
    });
    subcategory.category = req.body.category;
  }

  try {
    subcategory.save((err, updatedSubCategory) => {
      if (err) {
        return res.json({
          message: 'Category Modification failed',
          success: false,
        });
      }
      return res.json({
        message: 'Category Updated Successfully',
        success: true,
        data: updatedSubCategory,
      });
    });
  } catch {
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};
