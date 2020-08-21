"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Notes", "UsersId", {
      type: Sequelize.INTEGER,
      references: { model: "Users", key: "id" },
      after: "ClientsId",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Notes", "UsersId");
  },
};
