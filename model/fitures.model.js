module.exports = (sequelize, Sequelize) => {
  const Fitures = sequelize.define("fitures", {
    id_fitures: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name_fitures: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    limit_picture: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    use_video: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    premium_template: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    export_pdf: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Fitures;
};
