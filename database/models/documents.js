"use strict";
module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define(
    "Documents",
    {
      path: DataTypes.STRING,
    },
    {}
  );
  Documents.afterCreate(async (document) => {
    let path = document.path.split("/");
    path[1] = `D${document.id}_U${path[1]}`;
    document.path = path.join("/");
    await document.save();
  });
  Documents.associate = function (models) {
    this.belongsTo(models.Workers, { foreignKey: "WorkersId" });
  };
  return Documents;
};
