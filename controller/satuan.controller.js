const db = require("../model");
const Satuan = db.satuan;

exports.show = (req, res) => {
    Satuan.findAll({
        attributes : ["id_satuan", "nama_satuan", "simbol"],
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