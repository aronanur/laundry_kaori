'use strict';

const Model = require('sequelize').Sequelize.Model

module.exports = (sequelize, DataTypes) => {

  class Parfume extends Model {}

  Parfume.init({
    name: DataTypes.STRING
  }, { sequelize })

  Parfume.associate = function(models) {
    // Parfume.hasMany(models.Category)
  };
  return Parfume;
};