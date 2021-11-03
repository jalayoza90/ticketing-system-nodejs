const mongoose = require("mongoose");
const Sequelize = require("sequelize");
require("dotenv").config();
const URL = process.env.DB_URL;

module.exports = {
  connection: mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Conneted Mongodb!");
    })
    .catch((err) => {
      console.log("Error in Mongodb Database connetion::", err);
      process.exit();
    }),
    sequelize: new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
      host: process.env.HOST,
      dialect: 'mysql',
      operatorsAliases: false
    }),

};