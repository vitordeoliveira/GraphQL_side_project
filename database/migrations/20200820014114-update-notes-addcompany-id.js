"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Notes", "CompaniesId", {
      type: Sequelize.INTEGER,
      references: { model: "Companies", key: "id" },
      after: "id",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Notes", "CompaniesId");
  },
};
