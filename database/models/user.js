"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      role: DataTypes.STRING,
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  Users.associate = function (models) {
    this.belongsTo(models.Companies, { foreignKey: "CompaniesId" });
    this.hasMany(models.Operations, {
      foreignKey: "UsersId",
      as: "Operations",
    });
    this.hasMany(models.Notes, {
      foreignKey: "UsersId",
      as: "Notes",
    });
  };
  return Users;
};
