'use strict';

const Model = require('sequelize').Sequelize.Model
const Category = require('../models').Category

module.exports = (sequelize, DataTypes) => {

  class Transaction extends Model { }

  Transaction.init({
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    hook: {
      beforeCreate: (instance, options) => {
        instance.status = 'belum di proses'
        instance.start_date = new Date()
        Category
          .findByPk(this.CategoryId)
          .then(category => {
            instance.end_date = new Date(start_date.setDate(start_date.getDate() + category.duration))
            instance.total_price = (instance.qty * category.price)
          })
      }
    }
  })

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Category)
  };
  return Transaction;
};