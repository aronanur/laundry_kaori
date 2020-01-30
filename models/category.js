'use strict';

const Model = require('sequelize').Sequelize.Model

module.exports = (sequelize, DataTypes) => {

  class Category extends Model { }

  Category.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    ParfumeId: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    rating:{
      type:DataTypes.FLOAT,
      allowNull:false,
      validate: {
        notNull:{
          msg:'please input rating for our feedback'
        },
        notEmpty:{
          msg:'please input rating for our feedback'
        },
        isNumeric:{
          msg:'rating contain only number'
        }
      }
    }
  }, { sequelize })

  Category.associate = function (models) {
    // Category.belongsToMany(models.User, { through: models.Transaction })
    // Category.belongsTo(models.Parfume)
    // Category.hasMany(models.Transaction)
  };
  return Category;
};