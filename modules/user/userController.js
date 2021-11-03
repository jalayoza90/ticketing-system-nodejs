const userModel = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("../../helper/validator");
const { httpCodes, messages } = require("../../config/constants");
const userController = {};

userController.signup = async (req, res) => {
  const {
    errors,
    isValid
  } = validator.checkUserValidation(req.body);
  if (!isValid) {
    res.status(httpCodes.badRequest).json(errors);
  }
  req.body.email = req.body.email.toLowerCase();
  const {
    email,
    name,
    password,
    socialPlatform
  } = req.body;
  userModel.findOne({
    email
  }).then((user) => {
    if (user) {
      res.status(httpCodes.badRequest).json(messages.emailAlreadyRegistered);
    } else {
      const newUser = new userModel({
        name,
        email
      });
      if (!socialPlatform) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((user) => {
              res.json({
                data : user,
                message : messages.signupSuccess
              });
            }).catch((err) => console.log(err));
          });
        });
      } else {
        newUser.socialPlatform = socialPlatform;
        newUser.save().then((user) => {
          res.json({
            data : user,
            message : messages.signupSuccess
          });
        }).catch((err) => console.log(err));
      }
    }
  });
};

userController.login = async (req, res) => {
  const {
    errors,
    isValid
  } = validator.checkUserValidation(req.body);
  if (!isValid) {
    res.status(httpCodes.notFound).json(errors);
  } else {
    const {
      email,
      password
    } = req.body;
    userModel.findOne({
      email
    }).then((user) => {
      if (!user) {
        res.status(httpCodes.notFound).json({
          email: messages.emailNotExist
        });
      } else {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            res.status(httpCodes.notFound).json({
              error: messages.passwordNotExist
            });
          } else {
            const payLoad = {
              id: user.id,
            };
            jwt.sign(
              payLoad,
              process.env.JWT_SECRET, {
                expiresIn: 300000
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: token,
                  data: user,
                  message : messages.loginSuccess
                });
              } );
          }
        });
      }
    });
  }
};

module.exports = userController;