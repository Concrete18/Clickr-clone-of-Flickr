'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {});
  Photo.associate = function(models) {
    Photo.belongsTo(models.Album, {foreignKey:'albumId'})
  };
  return Photo;
};
