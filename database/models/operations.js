"use strict";

const { Companies, Users } = require(".");

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
  Operations.afterCreate(async (operation) => {
    const { Companies, Users, Products } = require(".");
    const { amount, ProductsId, UsersId, type, value } = operation;

    const user = await Users.findByPk(UsersId);
    const product = await Products.findByPk(ProductsId);
    const company = await Companies.findByPk(user.CompaniesId);

    if (type === 1) {
      product.stock = product.stock + amount;
      product.balanceStock =
        Number(product.balanceStock) + Number(amount) * Number(value);
      company.balance =
        Number(company.balance) - Number(amount) * Number(value);
    }

    if (type === 2) {
      if (product.stock >= Number(amount)) {
        product.stock = product.stock - amount;
        product.balanceStock =
          Number(product.balanceStock) - Number(amount) * Number(value);
        company.balance =
          Number(company.balance) + Number(amount) * Number(value);

        if (product.balanceStock < 0) {
          product.balanceStock = 0;
        }
      }
    }

    await product.save();
    await company.save();
  });

  Operations.beforeDestroy(async (operation) => {
    const { Companies, Users, Products } = require(".");
    const { amount, ProductsId, UsersId, type, value } = operation;
    const user = await Users.findByPk(UsersId);
    const product = await Products.findByPk(ProductsId);
    const company = await Companies.findByPk(user.CompaniesId);

    if (type === 1) {
      product.stock = product.stock - amount;
      product.balanceStock =
        Number(product.balanceStock) - Number(amount) * Number(value);
      company.balance =
        Number(company.balance) + Number(amount) * Number(value);
    }

    if (type === 2) {
      product.stock = product.stock + amount;
      product.balanceStock =
        Number(product.balanceStock) + Number(amount) * Number(value);
      company.balance =
        Number(company.balance) - Number(amount) * Number(value);
    }

    await product.save();
    await company.save();
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
