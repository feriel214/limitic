const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Category routes

// Create a new category
router.post('/categories', createCategory);

// Get all categories
router.get('/categories', getAllCategories);

// Get a single category by ID
router.get('/category/:id', getSingleCategory);

// Update a category by ID
router.put('/category/edit/:id', updateCategory);

// Delete a category by ID
router.delete('/category/delete/:id', deleteCategory);

module.exports = router;
