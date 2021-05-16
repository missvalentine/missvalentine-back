const Category = require('../models/category');

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.json({
        Error: 'Category Not Found',
      });
    }
    req.category = cate;

    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  try {
    category.save((err, cate) => {
      if (err) {
        return res.json({
          error: 'Not able to Add Category',
          success: false,
        });
      }
      return res.json({
        message: 'Category created Successfully',
        success: true,
        data: cate,
      });
    });
  } catch {
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

exports.getCategory = (req, res) => {
  try {
    return Category.findById(req.category._id)
      .populate('products')
      .populate('subcategories')
      .exec((err, cate) => {
        if (err) {
          return res.json({
            error: 'Not able to fetch product',
            success: false,
          });
        }
        return res.status(200).json({
          success: true,
          data: cate,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// {path: 'spells', options: { sort: [['damages', 'asc']] }}
// .populate('products')

exports.getAllCategory = (req, res) => {
  Category.find()
    .populate('subcategories')
    .populate({ path: 'products', options: { sort: { createdAt: -1 } } })
    .exec((err, categories) => {
      if (err) {
        return res.json({
          error: 'Not able to fetch Categories',
          success: false,
        });
      }
      return res.json({ data: categories, success: true });
    });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  try {
    category.save((err, updatedCategory) => {
      if (err) {
        return res.json({
          message: 'Category Modification failed',
          success: false,
        });
      }
      return res.json({
        message: 'Category Updated Successfully',
        success: true,
        data: updatedCategory,
      });
    });
  } catch {
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  try {
    category.remove((err, deletedCategory) => {
      if (err) {
        return res.json({
          message: 'Category Deletion failed',
          success: false,
        });
      }
      return res.json({
        message: 'Category Deletion SuccessFull',
        success: true,
      });
    });
  } catch {
    return res.status(500).json({
      message: 'Something went wrong',
      success: false,
    });
  }
};
