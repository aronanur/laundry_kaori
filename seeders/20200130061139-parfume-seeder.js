'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Parfumes', [
      {
        name: 'Green Tea',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Strawberry',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mint',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Parfumes', null, {})
  }
};
