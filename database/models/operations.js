"use strict";
module.exports = (sequelize, DataTypes) => {
  const Operations = sequelize.define(
    "Operations",
    {
      value: DataTypes.DECIMAL(10, 2),
      amount: DataTypes.INTEGER,
    },
    {}
  );
  Operations.associate = function (models) {
    this.belongsTo(models.Users, { foreignKey: "UsersId" });
    this.belongsTo(models.Products, { foreignKey: "ProductsId" });
  };
  return Operations;
};
