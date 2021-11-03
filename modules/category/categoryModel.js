const mongoose = require('mongoose');

const category = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

const categoryModel = mongoose.model('categories', category);
module.exports = categoryModel;