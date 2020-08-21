"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define(
    "Notes",
    {
      type: DataTypes.STRING,
      additional: DataTypes.DECIMAL(10, 2),
      discount: DataTypes.DECIMAL(10, 2),
      total: DataTypes.DECIMAL(10, 2),
    },
    {}
  );
  Notes.associate = function (models) {
    this.belongsTo(models.Clients, { foreignKey: "ClientsId", as: "Clients" });
    this.belongsTo(models.Companies, {
      foreignKey: "CompaniesId",
      as: "Companies",
    });
    this.belongsTo(models.Users, { foreignKey: "UsersId", as: "Users" });
    this.hasMany(models.Operations, {
      foreignKey: "NotesId",
      as: "Operations",
    });
  };
  return Notes;
};
