const db = require("../model");
const SetupPage = db.setup_pages;

exports.show = (req, res) => {
  SetupPage.findAll({
    where: {
      user: req.userId,
    },
    order: [["id_setup", "DESC"]],
    limit: 1
  })
    .then((result) => {
      return res.status(200).json({
        message: "menampilkan data setup page",
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

  SetupPage.findByPk(id)
    .then((result) => {
      if (result.user != req.userId) {
        return res.status(500).json({
          message: "unauthorization user",
        });
      }

      SetupPage.update(req.body, {
        where: {
          id_setup: id,
        },
      })
        .then((num) => {
          if (num == 1) {
            return res.status(200).json({
              message: "successfully update data",
            });
          } else {
            return res.status(500).json({
              message: `failed update data with id setup ${id}`,
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
  const user_id = req.userId;
  const textSplitUser = user_id.split("-");
  const IDuser = textSplitUser[2];
  const data_setup = {
    id_setup: "SET-" + IDuser,
    user: req.userId,
    theme: "primary",
    header: "default_picture_header.png",
    logo: "default_picture_profile.png",
    description: null,
    alamat: null,
    maps: null,
    whatsapp: null,
    message: "hello apa kabar?-",
  };

  SetupPage.findAll({
    where: {
      user: req.userId,
    },
    order: [["id_setup", "DESC"]],
    limit: 1,
  }).then((setup) => {
    if (setup.length == 1) {
      return res.status(500).json({
        message: "alredy setup page",
      });
    } else {
      SetupPage.create(data_setup)
        .then((result) => {
          return res.status(201).json({
            message: "successfully setup your page",
            data: result,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "error setup page",
          });
        });
    }
  }).catch((err) => {
    return res.status(500).json({
      message: err.message
    });
  });
};

exports.phone = (req, res) =>{
  SetupPage.findAll({
    attributes: ["whatsapp"],
    where: {
      user: req.userId,
    },
    order: [["id_setup", "DESC"]],
    limit: 1
  }).then((result) => {
    return res.status(500).json({
      message: "successfully get phone",
      data: result[0].whatsapp
    });
  }).catch((err) => {
    message: err.message
  });
};