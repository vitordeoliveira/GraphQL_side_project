"use strict";
module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define(
    "Clients",
    {
      type: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      comments: DataTypes.STRING(3000),
    },
    {}
  );
  Clients.associate = function (models) {
    this.hasMany(models.Operations, {
      foreignKey: "ClientsId",
      as: "Operations",
    });
    this.hasMany(models.Notes, {
      foreignKey: "ClientsId",
      as: "Notes",
    });
  };
  return Clients;
};
