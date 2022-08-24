const db = require("../model");
const Category = db.category;

exports.show = (req, res) => {
  Category.findAll({
    attributes: ["id_category", "name_category", "picture"],
    where: {
      user: req.userId,
    },
    order: [["id_category", "ASC"]]
  })
    .then((result) => {
      return res.status(200).json({
        message: "menampilkan semua data kategori",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then((result) => {
      if (result.user != req.userId) {
        return res.status(500).json({
          message: "unauthorization user",
        });
      }

      Category.update(req.body, {
        where: {
          id_category: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            return res.status(200).json({
              message: "successfully update data",
            });
          } else {
            return res.status(500).json({
              message: `failed update data with id category ${id}`,
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then((result) => {
      if (result.user != req.userId) {
        return res.status(500).json({
          message: "unauthorization user",
        });
      }

      Category.destroy({
        where: {
          id_category: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            return res.status(200).json({
              message: "successfully delete data",
            });
          } else {
            return res.status(500).json({
              message: `failed update data with id category ${id}`,
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.name_category) {
    return res.status(400).json({
      message: "title harus diisi..",
    });
  }

  Category.findAll({
    attributes: ["id_category"],
    where: {
      user: req.userId,
    },
    order: [["id_category", "DESC"]],
    limit: 1,
  })
    .then((category) => {
      const user_id = req.userId;
      const textSplitUser = user_id.split("-");
      const IDuser = textSplitUser[2];
      let data_category = {};
      if (category.length == 0) {
        data_category = {
          id_category: "CAT-" + IDuser + "-001",
          user: req.userId,
          ...req.body,
        };
      } else {
        data_category = {
          id_category: createNewIDCategory(category[0].id_category, IDuser),
          user: req.userId,
          ...req.body,
        };
      }

      Category.create(data_category)
        .then((result) => {
          return res.status(201).json({
            message: "successfully create category",
            data: result,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "error menambahkan category",
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

const createNewIDCategory = (hasil, id_user) => {
  let lastID = hasil;
  const textSplit = lastID.split("-");
  let idIncre = parseInt(textSplit[2]) + 1;
  const newID = "CAT-" + id_user + "-00" + idIncre;
  return newID;
};
