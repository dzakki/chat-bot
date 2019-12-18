'use strict';
const hashPassword = require('../helper').hashPassword
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {
    static getUserByEmailOrUsername(emailOrUsername){
      const Op = sequelize.Sequelize.Op;
      let options = {
            where:{
                [Op.or]: [
                    {
                        email: emailOrUsername
                    },
                    {
                        username: emailOrUsername
                    }
                ]
            }
        }
        return User.findOne(options)
    }
  }
  User.init({
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    username: {
      type:DataTypes.STRING,
      isUnique: function(value) {
        let self = this
        let options = {
          where: { email: value }
        }
        return User.findOne(options)
                   .then(user => {
                     if (user && (self.id && self.id !== user.id)) {
                       throw new Error('email has been user')
                     }else if (user && !self.id) {
                      throw new Error('email has been user')
                     }
                   })
      }  
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'email is not valid'
        },
        isUnique: function(value) {
          let self = this
          let options = {
            where: { email: value }
          }
          return User.findOne(options)
                     .then(user => {
                       if (user && (self.id && self.id !== user.id)) {
                         throw new Error('email has been user')
                       }else if (user && !self.id) {
                        throw new Error('email has been user')
                       }
                     })
        }  
      }
    },
    password:{
      type: DataTypes.STRING,
      validate:{
        min:{
          args: 6,
          msg: 'length minimun password is 6'
        }
      }
    },
    gender: DataTypes.STRING,
    secret: DataTypes.STRING
  },
  { 
    hooks:{
      beforeValidate: (user, options) => {
        // console.log(options)
        user.id = (!options.where) ? null : options.where.id;
      },
      afterValidate: (user, options) => {
        user.id = null;
      },
      beforeCreate: (user, options) => {
        user.secret =  String(Math.random() * 10000)
        user.password = hashPassword(user.secret, user.password)
      },
      beforeUpdate(user, options){
        user.password = hashPassword(user.secret, user.password)
      }
    },
    sequelize 
  });
  
  
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Languange, {through: models.UserLanguange})
  };
  return User;
};