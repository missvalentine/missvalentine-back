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
  category.save((err, cate) => {
    if (err) {
      return res.json({
        error: 'Not able to Add Category',
        success: false,
      });
    }
    return res.json({ data: cate, success: true });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find()
    .populate('subcategories')
    .populate('products')
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

  category.save((err, updatedCategory) => {
    if (err) {
      return res.json({
        Error: 'Not able to Update Category',
      });
    }
    return res.json({ updatedCategory });
  });
};

exports.deleteCategory = (req, res) => {
  console.log('deleting');
  const category = req.category;
  category.remove((err, deletedCategory) => {
    if (err) {
      return res.json({
        Error: 'Not able to Delete Category',
      });
    }
    return res.json({ msg: 'Category Deletion SuccessFull' });
  });
};
