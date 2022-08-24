module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id_user: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    role_user:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fullname:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    verified: {
        type:Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    fitures: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    credit: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
  });

  return User;
};
