const db = require("../model");
const TipePenjualan = db.tipe;

exports.show = (req, res) => {
    TipePenjualan.findAll({
        attributes : ["id_tipe", "nama_tipe"],
    }).then((result) => {
        return res.status(200).json({
            message: "menampilkan data satuan",
            data: result
        })
    }).catch((err) => {
        return res.status(400).json({
            message: err.message 
        })
    });
};