'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Transactions', [
      {
        UserId: 1,
        CategoryId: 1,
        status: 'belum di proses',
        qty: 2,
        total_price: 30000,
        start_date: new Date(),
        pay_code:'09876',
        end_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        CategoryId: 2,
        status: 'belum di proses',
        qty: 3,
        total_price: 35000,
        pay_code:'09886',
        start_date: new Date(),
        end_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 2,
        CategoryId: 1,
        status: 'belum di proses',
        qty: 4,
        total_price: 20000,
        pay_code:'01216',
        start_date: new Date(),
        end_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Transactions', null, {})
  }
};
