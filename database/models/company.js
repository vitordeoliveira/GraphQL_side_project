"use strict";
module.exports = (sequelize, DataTypes) => {
  const Companies = sequelize.define(
    "Companies",
    {
      name: DataTypes.STRING,
      balance: DataTypes.DECIMAL(10, 2),
    },
    {}
  );
  Companies.associate = function (models) {
    Companies.hasMany(models.Users, { foreignKey: "CompaniesId", as: "Users" });
    Companies.hasMany(models.Products, {
      foreignKey: "CompaniesId",
      as: "Products",
    });
  };
  return Companies;
};
