"use strict";
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      name: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      balanceStock: DataTypes.DECIMAL,
    },
    {}
  );
  Products.associate = function (models) {
    this.belongsTo(models.Companies, { foreignKey: "CompaniesId" });
    this.hasMany(models.Operations, {
      foreignKey: "ProductsId",
      as: "Operations",
    });
  };
  return Products;
};
