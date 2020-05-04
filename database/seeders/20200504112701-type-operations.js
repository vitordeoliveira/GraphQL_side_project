"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "type_operations",
      [
        {
          type: "Purchase",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Sale",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("type_operations", null, {});
  },
};
