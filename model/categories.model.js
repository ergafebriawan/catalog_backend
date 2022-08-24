module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
        id_category: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name_category:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        picture: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "default_picture_category.png",
        }
    });

    return Category;
};