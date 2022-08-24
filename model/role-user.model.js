module.exports = (sequelize, Sequelize) => {
    const roleUser = sequelize.define("role_users", {
      id_roleuser: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name_roleuser:{
          type: Sequelize.STRING,
          allowNull: false,
      },
      previleges: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  
    return roleUser;
  };
  