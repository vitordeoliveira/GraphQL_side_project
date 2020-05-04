"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "type_clients",
      [
        {
          type: "Buyer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Seller",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("type_clients", null, {});
  },
};
