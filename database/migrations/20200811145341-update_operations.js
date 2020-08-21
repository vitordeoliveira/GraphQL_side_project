"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Operations", "NotesId", {
      type: Sequelize.INTEGER,
      references: { model: "Notes", key: "id" },
      onDelete: "cascade",
      after: "type",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Operations", "NotesId");
  },
};
