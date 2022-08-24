const db = require("../model");
const Product = db.product;
const Image = db.image;
const Category = db.category;

exports.index = (req, res) => {
  Product.findAll({
    attributes: ["id_product", "category", "name_product", "picture"],
    where: {
      user: req.userId,
    },
    order: [["id_product", "DESC"]],
    include: Image
  })
    .then((result) => {
      return res.status(200).json({
        message: "menampilkan semua data product",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

exports.show = (req, res) => {
  const id = req.params.id;
  Product.findAll({
    where: {
      id_product: id,
    },
    order: [["id_product", "DESC"]],
    limit: 1,
    include: [
      {
        model: Image,
        attributes:{
          exclude: ['createdAt', 'updatedAt'],
        },
      },
      // {
      //   model: Category,
      //   attributes:{
      //     exclude: ['createdAt', 'updatedAt']
      //   }
      // }
    ]
  })
    .then((result) => {
      return res.status(200).json({
        message: `menampilkan data product ${id}`,
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};



exports.showbycategory = (req, res) => {
  id_category = req.params.id;

  Product.findAll({
    where: {
      user: req.userId,
      category: id_category,
    },
    order: [["id_product", "DESC"]],
    include: Image
  })
    .then((result) => {
      return res.status(200).json({
        message: `menampilkan data category ${id_category}`,
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

exports.active_product = (req, res) => {
  Product.findAll({
    attributes: ["id_product", "category", "name_product", "picture"],
    where: {
      user: req.userId,
      active: true,
    },
    order: [["id_product", "DESC"]],
    include: Image
  })
    .then((result) => {
      return res.status(200).json({
        message: "show active product",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
      });
    });
};

exports.archive_product = (req, res) => {
  Product.findAll({
    attributes: ["id_product", "category", "name_product", "picture"],
    where: {
      user: req.userId,
      active: false,
    },
    order: [["id_product", "DESC"]],
    include: Image
  })
    .then((result) => {
      return res.status(200).json({
        message: "show active product",
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

  Product.findByPk(id)
    .then((result) => {
      if (result.user != req.userId) {
        return res.status(500).json({
          message: "unauthorization user",
        });
      }

      Product.update(req.body, {
        where: {
          id_product: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            return res.status(200).json({
              message: "successfully update data",
            });
          } else {
            return res.status(500).json({
              message: `failed update data with id product ${id}`,
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

  Product.findByPk(id)
    .then((result) => {
      if (result.user != req.userId) {
        return res.status(500).json({
          message: "unauthorization user",
        });
      }

      Product.destroy({
        where: {
          id_product: id,
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
  if (!req.body.name_product) {
    return res.status(400).json({
      message: "nama product harus diisi..",
    });
  }

  Product.findAll({
    attributes: ["id_product"],
    where: {
      user: req.userId,
    },
    order: [["id_product", "DESC"]],
    limit: 1,
  })
    .then((product) => {
      const user_id = req.userId;
      const textSplitUser = user_id.split("-");
      const IDuser = textSplitUser[2];
      let data_product = {};

      if(product.length == 0){
        data_product = {
          id_product: "PRO-"+IDuser+"-001",
          user: req.userId,
          ...req.body
        };
      }else{
        data_product = {
          id_product: createNewIDProduct(product[0].id_product, req.userId),
          user: req.userId,
          ...req.body
        };
      }

      Product.create(data_product)
        .then((result) => {
          return res.status(201).json({
            message: "successfully add product",
            data: result,
          });
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

exports.active = (req, res) => {
  const id = req.params.id;
  const state = req.body.active;

  Product.findByPk(id).then((result) => {
    if (result.active == state) {
      var message_state = "";
      if (state == true) {
        message_state = "active";
      } else {
        message_state = "unactive";
      }

      return res.status(500).json({
        message: `product already ${message_state}`,
      });
    } else {
      var into_state = false;
      if (state == true) {
        into_state = false;
      } else {
        into_state = true;
      }
      Product.update(req.body, {
        where: {
          id_product: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            return res.status(200).json({
              message: "successfully update data",
            });
          } else {
            return res.status(500).json({
              message: `failed update data with id product ${id}`,
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            message: err.message,
          });
        });
    }
  });
};

const createNewIDProduct = (hasil, id_user) => {
  const textSplitUser = id_user.split("-");
  const IDuser = textSplitUser[2];

  let lastID = hasil;
  const textSplit = lastID.split("-");
  let idIncre = parseInt(textSplit[2]) + 1;
  newID = "PRO-" + IDuser + "-00" + idIncre;
  return newID;
};
