'use strict';

const users = [
  {
    name: 'ahmad muzakki',
    username: 'dzakki',
    email: 'dzakki7@gmail.com',
    password: '2c629c95f425d51a4853a3cdb0885bb64b3e2ff4188ee961e7e498662f930e71', //123456
    gender: 'male',
    secret: '12345',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'sadam husein',
    username: 'sadam',
    email: 'sadam@gmail.com',
    password: '2c629c95f425d51a4853a3cdb0885bb64b3e2ff4188ee961e7e498662f930e71', //123456
    gender: 'male',
    secret: '12345',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Aldo firman',
    username: 'firman',
    email: 'firman@gmail.com',
    password: '2c629c95f425d51a4853a3cdb0885bb64b3e2ff4188ee961e7e498662f930e71', //123456
    gender: 'male',
    secret: '12345',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', users, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
