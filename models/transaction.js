'use strict';

const Model = require('sequelize').Sequelize.Model
const Category = require('../models').Category

module.exports = (sequelize, DataTypes) => {

  class Transaction extends Model { }

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
    pay_code: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        instance.status = 'belum di proses'
        instance.start_date = new Date()
        instance.pay_code = Date.now().slice(0, 4) + 'categoryId' + instance.CategoryId
        // console.log(instance)
        Category
          .findByPk(this.CategoryId)
          .then(category => {
            instance.end_date = new Date(start_date.setDate(start_date.getDate() + category.duration))
            instance.total_price = (instance.qty * category.price)
          })
      }
      // afterFind: (instances, options) => {
      // instances.forEach(instance => {
      //   instance.start_date = new Date()
      //    Category
      //      .findByPk(instance.CategoryId)
      //      .then(category => {
      //        instance.end_date = new Date(start_date.setDate(start_date.getDate() + category.duration))
      //        instance.total_price = (instance.qty * category.price)
      //      })
      // console.log(instance)
      // })
      // instance.status = 'belum di proses'

    }
  })

  Transaction.associate = function (models) {
    // Transaction.belongsTo(models.User)
    // Transaction.belongsTo(models.Category)
  };
  return Transaction;
};