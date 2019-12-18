'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLanguange = sequelize.define('UserLanguange', {
    UserId: DataTypes.INTEGER,
    LanguangeId: DataTypes.INTEGER
  }, {});
  UserLanguange.associate = function(models) {
    // associations can be defined here
  };
  return UserLanguange;
};