'use strict';

const userLangs = [
  {
    UserId: 1,
    LanguangeId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    UserId: 1,
    LanguangeId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    UserId: 2,
    LanguangeId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    UserId: 2,
    LanguangeId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    UserId: 3,
    LanguangeId: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    UserId: 3,
    LanguangeId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserLanguanges', userLangs , {});
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
    return queryInterface.bulkDelete('UserLanguanges', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
