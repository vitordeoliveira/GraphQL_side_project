"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Products", "last_purchase", {
      type: Sequelize.DECIMAL(10, 2),
      after: "balanceStock",
      defaultValue: 0,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Products", "last_purchase");
  },
};
