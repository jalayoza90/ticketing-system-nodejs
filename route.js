const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
var cors = require('cors')
const userRoute = require("./modules/user/userRoute");
const categoryRoute = require("./modules/category/categoryRoute");
const url = "/api/v1";
const middleware = require('./helper/middleware');
const contentRoute = require("./modules/content/contentRoute");

// Body Parser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// cors
app.use(cors());

// Routes

// Auth related routes
app.use(url + "/user", userRoute);

// Category related routes
app.use(url + "/category", middleware.authenticateUsers, categoryRoute);

// Content related routes
app.use(url + "/content", middleware.authenticateUsers, contentRoute);

module.exports = app;
