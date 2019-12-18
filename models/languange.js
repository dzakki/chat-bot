'use strict';
module.exports = (sequelize, DataTypes) => {
  const Languange = sequelize.define('Languange', {
    kode: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Languange.associate = function(models) {
    // associations can be defined here
    Languange.belongsToMany(models.User, {through: models.UserLanguange})
  };
  return Languange;
};