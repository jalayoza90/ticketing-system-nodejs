const express = require('express');
const contentController = require('./contentController');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const contentRoute = express.Router();

// Add content
const addContentRoutePath = [contentController.addContent];
contentRoute.post('/', multipartMiddleware, addContentRoutePath);

// Get content by category
const getContentsRoutePath = [contentController.getContentbyCategories];
contentRoute.get('/:categoryId', getContentsRoutePath);


module.exports = contentRoute;