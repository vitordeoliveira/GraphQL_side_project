"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Operations", "amount", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Operations", "amount", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
