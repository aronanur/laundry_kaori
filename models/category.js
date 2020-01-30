'use strict';

const Model = require('sequelize').Sequelize.Model

module.exports = (sequelize, DataTypes) => {

  class Category extends Model { }

  Category.init({
    name:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'please input category name'
        },
        notEmpty: {
          msg: 'please input category name'
        }
      }
    },
    price:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'please input price'
        },
        notEmpty: {
          msg: 'please input price'
        },
        isInt: {
          msg: 'price must contain ONLY number'
        }
      }

    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'please input duration'
        },
        notEmpty: {
          msg: 'please input duration'
        },
        isInt: {
          msg: 'price must contain ONLY number'
        }
      }
    },
    ParfumeId: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    rating: {
      type: DataTypes.FLOAT,
      // allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: 'please input rating for our feedback'
      //   },
      //   notEmpty: {
      //     msg: 'please input rating for our feedback'
      //   },
      //   isNumeric: {
      //     msg: 'rating contain only number'
      //   }
      // }
    }
  }, { sequelize })

  Category.associate = function (models) {
    Category.belongsToMany(models.User, { through: models.Transaction })
    Category.belongsTo(models.Parfume)
    Category.hasMany(models.Transaction)
  };
  return Category;
};