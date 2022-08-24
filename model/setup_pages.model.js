module.exports = (sequelize, Sequelize) => {
    const SetupPage = sequelize.define("setup_pages", {
        id_setup: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        user: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        theme:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        header: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "default_picture_header.png",
        },
        logo:{
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "default_picture_profile.png"
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: true
        },
        alamat:{
            type: Sequelize.TEXT,
            allowNull: true
        },
        maps:{
            type: Sequelize.TEXT,
            allowNull: true
        },
        whatsapp:{
            type: Sequelize.STRING,
            allowNull: true
        },
        message:{
            type: Sequelize.TEXT,
            allowNull: true
        }
    });

    return SetupPage;
};