module.exports = (sequelize, Sequelize) => {
    const Satuan = sequelize.define("satuans", {
        id_satuan: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        nama_satuan: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        simbol:{
            type: Sequelize.STRING,
            allowNull:false,
        }
    });

    return Satuan;
};