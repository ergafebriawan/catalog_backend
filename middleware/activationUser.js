const db = require("../model");
const User = db.user;

validationActivation = (req, res, next) => {
  User.findOne({
    where: {
      id_user: req.params.id_user,
    },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "user not found",
        });
      } else if (result.verified == true) {
        return res.status(400).json({
          message: "user already active",
        });
      }
      next();
    })
    .catch((err) => {
      return res.status(404).json({
        message: "failed activation user",
      });
    });
};

checkActivation = (req, res, next) => {
    User.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then((result) => {
          if (result.verified == false) {
            return res.status(404).json({
              message: "user has not activation",
            });
          }
          next();
        });
}

module.exports = {
  validationActivation,
  checkActivation,
};
