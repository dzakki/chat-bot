'use strict';
module.exports = (sequelize, DataTypes) => {
  const BotHistory = sequelize.define('BotHistory', {
    UserId: DataTypes.INTEGER,
    BotId: DataTypes.INTEGER
  }, {});
  BotHistory.associate = function(models) {
    // associations can be defined here
  };
  return BotHistory;
};