"use strict";
module.exports = (sequelize, DataTypes) => {
  const Workers = sequelize.define(
    "Workers",
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {}
  );
  Workers.associate = function (models) {
    this.belongsTo(models.Companies, { foreignKey: "CompaniesId" });
    this.hasMany(models.Documents, {
      foreignKey: "WorkersId",
      as: "Documents",
    });
  };
  return Workers;
};
