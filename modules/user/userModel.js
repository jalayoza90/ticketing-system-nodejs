const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    socialPlatform: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: true
});

const userModel = mongoose.model('users', user);
module.exports = userModel;