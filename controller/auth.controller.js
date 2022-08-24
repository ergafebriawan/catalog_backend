const config = require("../config/auth");
const db = require("../model");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  User.findAll({
    attributes: ["id_user"],
    where: {
      role_user: "RL-003",
    },
    order: [["id_user", "DESC"]],
    limit: 1,
  }).then((result) => {
    User.create({
      id_user: createNewID(result[0].id_user),
      role_user: "RL-003",
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      verified: false,
      active: true,
      fitures: "FT-003",
      credit: 0,
    })
      .then((user) => {
        res.status(201).json({
          message: "user was registered sucessfully!",
          data: user,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  });
};

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: "invalid password!",
        });
      }

      let token = jwt.sign({ id: user.id_user }, config.secret, {
        expiresIn: 86400, //24
      });

      res.status(200).json({
        id: user.id_user,
        name: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.verifiedAccount = (req, res) => {
  User.update(
    { verified: true },
    {
      where: {
        id_user: req.body.id_user,
      },
    }
  ).then((result) => {
    return res.status(200).json({
      message: "user is activate",
    });
  });
};

const createNewID = (hasil) => {
  let lastID = hasil;
  const textSplit = lastID.split("-");
  let idIncre = parseInt(textSplit[2]) + 1;
  newID = "USR-US-00" + idIncre;
  return newID;
};
