'use strict';
module.exports = (sequelize, DataTypes) => {
  const bot = sequelize.define('bot', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  bot.associate = function(models) {
    // associations can be defined here
  };
  return bot;
};