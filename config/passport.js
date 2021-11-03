const db = require('./database');
const mongoose = require('mongoose');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../modules/user/userModel');
const passport = require('passport');

const options = {};
options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
    new jwtStrategy(options, (payload, done) => {
        userModel.findById(payload.id).then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }).catch(error => {
            console.log(error);
        })
    });
}