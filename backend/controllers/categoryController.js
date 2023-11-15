const Category = require('../models/categoryModel');
const ErrorResponse = require('../utils/errorResponse');

// Load all categories
exports.getAllCategories = async (req, res, next) => {
  // Enable pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Category.find({}).estimatedDocumentCount();

  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      categories,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// Show a single category
exports.getSingleCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      success: true,
      category,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
    next();
  } catch (error) {
    return next(error);
  }
};

// Update a category
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      category,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

// Delete a category
exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "Category deleted",
    });
    next();
  } catch (error) {
    return next(error);
  }
};
