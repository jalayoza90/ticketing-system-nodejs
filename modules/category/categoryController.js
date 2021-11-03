const { httpCodes, messages } = require('../../config/constants');
const categoryModel = require('./categoryModel');

const categoryController = {};

    /**
     *  this function should be create category
     * @param {*} req  request object
     * @param {*} res  response object
     */
categoryController.addCategory = async(req, res) => {
    req.body.userId = req.userData._id;
    const {
        userId,
        title,
        description
    } = req.body;

    let categories = await new categoryModel({
        userId,
        title,
        description
    });
    
    await categories.save().then((categoriesData) => {
        res.status(httpCodes.ok).json({
            data: categoriesData,
            message: messages.createCategory
        });
    });
};

/**
 *  this function should be update category
 * @param {*} req  request object
 * @param {*} res  response object
 */
categoryController.updateCategory = async(req, res) => {
    req.body.userId = req.userData._id;
    const {
        userId,
        title,
        description
    } = req.body;

    const {
        id
    } = req.params;
    
    const responseData = await categoryModel.findOneAndUpdate(
        {_id: id, userId},
        {$set: {title, description}}
    );
    if (responseData) {
        res.status(httpCodes.ok).json({
            message: messages.updateCategory
        });
    } else {
        res.status(httpCodes.badRequest).json({message: messages.invalidRequest});
    }
};

/**
 *  this function should be delete category of Id
 * @param {*} req  request object
 * @param {*} res  response object
 */
categoryController.deleteCategory = async(req, res) => {
    const {
        id
    } = req.params;
    const responseData = await categoryModel.deleteOne({_id: id});
    if (responseData) {
        res.status(httpCodes.ok).json({
            message: messages.deleteCategory
        });
    } else {
        res.status(httpCodes.badRequest).json({message: messages.invalidRequest});
    }
};

/**
 *  this function should be fetch all categories
 * @param {*} req  request object
 * @param {*} res  response object
 */
categoryController.getCategories = async(req, res) => {
    req.body.userId = req.userData._id;
    const {
        userId
    } = req.body;
    const responseData = await categoryModel.find({userId});
    res.status(httpCodes.ok).json({
        data: responseData,
        totalCount: responseData.length,
        message: messages.success
    });
};

module.exports = categoryController;