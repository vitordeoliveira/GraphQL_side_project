"use strict";
module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define(
    "Documents",
    {
      path: DataTypes.STRING,
    },
    {}
  );
  Documents.associate = function (models) {
    this.belongsTo(models.Workers, { foreignKey: "WorkersId" });
  };
  return Documents;
};
