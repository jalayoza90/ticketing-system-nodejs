module.exports = (sequelize, Sequelize) => {

    const content = sequelize.define('content',{
        categoryId: {
            type: Sequelize.INTEGER,
            required: true,
        }, title: {
            type: Sequelize.STRING,
            required: true
        }, description: {
            type: Sequelize.TEXT,
            required: true
        }, image: {
            type: Sequelize.TEXT
        }
    });
    return content;
}
