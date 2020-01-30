'use strict';

const Model = require('sequelize').Sequelize.Model
const Helper = require('../helper/helper')

module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.models.Category
  
  class Transaction extends Model {
    static findAllWithFilter(keyword) {
      if (keyword) {
        return this.findAll({
          where: {
            status: keyword
          }
        }
        )
      }
      else {
        return this.findAll()
      }
    }
  }

  Transaction.init({
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Quantity can't be empty"
        },
        notEmpty: {
          msg: "Quantity can't be empty"
        },
        isInt: {
          msg: 'Quantity must number'
        }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Total price can't be empty"
        },
        notEmpty: {
          msg: "Total price can't be empty"
        },
        isInt: {
          msg: 'Total price must number'
        }
      }
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    pay_code: DataTypes.STRING,
    notes: DataTypes.STRING,
    invoice: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        let start_date = new Date()
        return Category
        .findByPk(instance.CategoryId)
        .then(category => {
            instance.start_date = new Date()
            instance.pay_code = Helper.generatePayCode(instance.CategoryId)
            instance.end_date = new Date(start_date.setDate(start_date.getDate() + category.duration))
            // console.log(instance.end_date)
            // console.log(instance.qty * category.price, category.price, instance.qty)
            instance.total_price = (instance.qty * category.price)
          })
      },
      beforeUpdate : (instance, options) => {
        return Category
          .findByPk(instance.CategoryId)
          .then(response => {
            instance.total_price = instance.qty * response.price
          })
      }
    }, sequelize
  })

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Category)
  };
  return Transaction;
};