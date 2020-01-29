'use strict';

const Model = require('sequelize').Sequelize.Model

module.exports = (sequelize, DataTypes) => {

  class User extends Model {}

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    role: DataTypes.STRING
  }, { sequelize })

  User.associate = function(models) {
    User.belongsToMany(models.Category, { through: models.Transaction })
    User.hasMany(models.Transaction)
  };
  return User;
};