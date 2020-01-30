'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: 'Fast and Furious',
        price: 15000,
        duration: 1,
        picture:'https://image.flaticon.com/icons/svg/832/832609.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Regex Cleaning',
        price: 10000,
        duration: 3,
        picture:'https://www.flaticon.com/premium-icon/icons/svg/2377/2377025.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Slow but Clean',
        price: 8000,
        duration: 5,
        picture:'https://image.flaticon.com/icons/svg/1455/1455342.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  }
};