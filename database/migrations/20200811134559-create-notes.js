"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Notes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ClientsId: {
        type: Sequelize.INTEGER,
        references: { model: "Clients", key: "id" },
        onDelete: "cascade",
      },
      type: {
        type: Sequelize.INTEGER,
        references: { model: "type_operations", key: "id" },
        allowNull: false,
        onDelete: "cascade",
      },
      additional: {
        type: Sequelize.DECIMAL(10, 2),
      },
      discount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Notes");
  },
};
