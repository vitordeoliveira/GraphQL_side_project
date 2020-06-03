"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          CompaniesID: 1,
          name: "Aluminio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CompaniesID: 1,
          name: "Cobre",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CompaniesID: 1,
          name: "Cobalto",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
