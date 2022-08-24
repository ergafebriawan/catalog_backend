module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define("media_pictures", {
    product: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    file: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Image;
};
