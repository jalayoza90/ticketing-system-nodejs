const middleware = {};
const jwt = require('jsonwebtoken');
const {
    messages,
    httpCodes
} = require('../config/constants');
const userModel = require('../modules/user/userModel');

middleware.checkIsEmailExists = (req, res, next) => {
    const {
        email
    } = req.body;
    userModel.findOne({
        email: email.toLowerCase()
    }).then((user) => {
        if (user) {
            return res.status(httpCodes.badRequest).json({
                message: messages.emailAlreadyRegistered
            });
        } else {
            next();
        }
    }).catch((error) => {
        return res.status(400).json({
            message: error
        });
    });
};

middleware.authenticateUsers = async (req, res, next) => {
    if (req.headers && req.headers['authorization']) {
        var decoded = await jwt.decode(req.headers['authorization'], process.env.JWT_SECRET);
        userModel.findOne({
            "_id": decoded.id
        }).exec(function (err, user) {
            if (!user) {
                res.status(httpCodes.unAuthorized).json({
                    "message": messages.unAuthorized
                });
                return;
            } else {
                req.userData = user;
                next();
            }
        })
    } else {
        res.status(httpCodes.unAuthorized).json({
            "message": messages.unAuthorized
        });
    }
}

module.exports = middleware;