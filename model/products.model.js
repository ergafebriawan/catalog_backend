module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        id_product: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        category:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        name_product:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        price:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        discount:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        type:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        stock:{
            type:Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        satuan:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: true,
        },
        external_link:{
            type: Sequelize.TEXT,
            allowNull: true,
        },
        picture: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: "default_picture_product.png",
        },
        video:{
            type: Sequelize.TEXT,
            allowNull: true,
        },
        active:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });

    return Product;
};