const express = require('express');
const userController = require('./userController');
const middelware = require('../../helper/middleware');
const userRoute = express.Router();

// Signup API
signupRouthPath = [
    middelware.checkIsEmailExists,
     userController.signup];
userRoute.post('/sign-up', signupRouthPath);

// Login API
userRoute.post('/login', userController.login);

module.exports = userRoute;