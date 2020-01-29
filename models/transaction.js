'use strict';

const Model = require('sequelize').Sequelize.Model

module.exports = (sequelize, DataTypes) => {

  class Transaction extends Model {}

  Transaction.init({
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  },{ sequelize })

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Category)
  };
  return Transaction;
};