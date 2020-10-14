"use strict";

module.exports = (sequelize, DataTypes) => {
  const Operations = sequelize.define(
    "Operations",
    {
      type: DataTypes.STRING,
      value: DataTypes.DECIMAL(10, 2),
      amount: DataTypes.DECIMAL(10, 2),
    },
    {}
  );
  Operations.beforeCreate(async (operation) => {
    const { Products } = require(".");
    const { amount, ProductsId, type, value } = operation;
    const product = await Products.findByPk(ProductsId);

    if (type === 2) {
      if (product.stock >= Number(amount)) {
        product.stock = product.stock - amount;
        product.balanceStock =
          Number(product.balanceStock) - Number(amount) * Number(value);

        if (product.balanceStock < 0) {
          product.balanceStock = 0;
        }
      }
    }

    await product.save();
  });

  Operations.afterCreate(async (operation) => {
    const { Products } = require(".");
    const { amount, ProductsId, type, value } = operation;

    const product = await Products.findByPk(ProductsId);

    if (type === 1) {
      product.stock = product.stock + amount;
      product.balanceStock =
        Number(product.balanceStock) + Number(amount) * Number(value);
    }

    await product.save();
  });

  Operations.beforeDestroy(async (operation) => {
    const { Products } = require(".");
    const { amount, ProductsId, type, value } = operation;
    const product = await Products.findByPk(ProductsId);

    if (type === 1) {
      product.stock = product.stock - amount;
      product.balanceStock =
        Number(product.balanceStock) - Number(amount) * Number(value);
    }

    if (type === 2) {
      product.stock = product.stock + amount;
      product.balanceStock =
        Number(product.balanceStock) + Number(amount) * Number(value);
    }

    await product.save();
  });

  Operations.associate = function (models) {
    this.belongsTo(models.Users, { foreignKey: "UsersId", as: "Users" });
    this.belongsTo(models.Products, {
      foreignKey: "ProductsId",
      as: "Products",
    });
    this.belongsTo(models.Clients, { foreignKey: "ClientsId", as: "Clients" });
    this.belongsTo(models.Notes, { foreignKey: "NotesId", as: "Notes" });
  };
  return Operations;
};
