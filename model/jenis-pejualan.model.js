module.exports = (sequelize, Sequelize) => {
    const JenisPenjualan = sequelize.define("jenis_penjualans", {
        id_tipe: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        nama_tipe: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return JenisPenjualan;
};