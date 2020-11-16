"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Operations", "CompaniesId", {
      type: Sequelize.INTEGER,
      references: { model: "Companies", key: "id" },
      onDelete: "cascade",
      after: "ClientsId",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Operations", "CompaniesId");
  },
};
