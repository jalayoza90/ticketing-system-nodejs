const express = require('express');
const categoryController = require('./categoryController');
const categoryRoute = express.Router();

// Create category API
const addCategoryRoutePath = [
    categoryController.addCategory
];
categoryRoute.post('/', addCategoryRoutePath);

// Update category API
const updateCategoryRoutePath = [
    categoryController.updateCategory
];
categoryRoute.put('/:id', updateCategoryRoutePath);

// Delete category API
const deleteCategoryRoutePath = [
    categoryController.deleteCategory
];
categoryRoute.delete('/:id', deleteCategoryRoutePath);

// List categories API
const getCategoriesRoutePath = [
    categoryController.getCategories
];
categoryRoute.get('/', getCategoriesRoutePath);

module.exports = categoryRoute;