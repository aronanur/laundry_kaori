'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [
      {
        name: 'Isni',
        address: 'Tanah Kusir',
        phone: '081234568',
        email: 'isnirof@kaori.com',
        password: 'qwerty',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arona',
        address: 'Palmerah',
        phone: '0813334455',
        email: 'arona@kaori.com',
        password: '12345',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {})
  }
};