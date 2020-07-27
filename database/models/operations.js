"use strict";
module.exports = (sequelize, DataTypes) => {
  const Operations = sequelize.define(
    "Operations",
    {
      type: DataTypes.STRING,
      value: DataTypes.DECIMAL(10, 2),
      amount: DataTypes.INTEGER,
    },
    {}
  );
  Operations.associate = function (models) {
    this.belongsTo(models.Users, { foreignKey: "UsersId", as: "Users" });
    this.belongsTo(models.Products, {
      foreignKey: "ProductsId",
      as: "Products",
    });
    this.belongsTo(models.Clients, { foreignKey: "ClientsId", as: "Clients" });
  };
  return Operations;
};
