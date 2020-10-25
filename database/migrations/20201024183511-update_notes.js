"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Notes", "observation", {
      type: Sequelize.STRING(3000),
      after: "total",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Notes", "observation");
  },
};
