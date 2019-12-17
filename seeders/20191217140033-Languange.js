'use strict';

const langs = [
  {
    name: 'Arabic',
    kode: "ar",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'English',
    kode: "en",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Indonesian',
    kode: "id",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Korean',
    kode: "ko",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Malay",
    kode: "ms",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Vietnamese",
    kode: "vn*",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Languanges', langs, {});
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
    return queryInterface.bulkDelete('Languanges', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
