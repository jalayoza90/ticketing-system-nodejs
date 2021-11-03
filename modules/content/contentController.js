const db = require("../../config/database");
const Sequelize = require("sequelize");
const contentModel = require('./contentModel')(db.sequelize, Sequelize);
const aws = require('../../helper/aws');
const {
    httpCodes,
    messages
} = require('../../config/constants');

const contentController = {};

/**
 *  this function should be create content of category
 * @param {*} req  request object
 * @param {*} res  response object
 */
contentController.addContent = async (req, res) => {
    const {
        categoryId,
        title,
        description
    } = req.body;

    let contentData = {
        categoryId,
        title,
        description
    };

    const {
        image
    } = req.files;

    if (image) {
        const images = await aws.uploadImage(image, "original");
        contentData = {
            ...contentData,
            image: images
        };
    }

    contentModel.create(contentData).then((contentData) => {
        console.log("contentData",contentData);
        res.status(httpCodes.ok).json({
            data: contentData,
            message: messages.contentAdded
        });
    }).catch(err=> {
        console.log(err);
    });

    
};

/**
 *  this function should be fetch content list 
 * @param {*} req  request object
 * @param {*} res  response object
 */

contentController.getContentbyCategories = async (req, res) => {
    const {
        categoryId
    } = req.params;
    const responseData = await contentModel.findAll({
        categoryId
    });
    res.status(httpCodes.ok).json({
        data: responseData,
        message: messages.success
    });
};

module.exports = contentController;