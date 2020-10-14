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

  Notes.afterUpdate(async (note) => {
    const { Companies } = require(".");

    const company = await Companies.findByPk(note.CompaniesId);

    if (note.type == 1) {
      company.balance = Number(company.balance) - Number(note.total);
    }

    if (note.type == 2) {
      company.balance = Number(company.balance) + Number(note.total);
    }

    await company.save();
  });

  Notes.beforeDestroy(async (data) => {
    const { Notes, Operations, Products, Companies } = require(".");
    const note = await Notes.findByPk(data.id, {
      include: [
        {
          model: Operations,
          as: "Operations",
          include: [
            {
              model: Products,
              as: "Products",
            },
          ],
        },
      ],
    });
    const company = await Companies.findByPk(data.CompaniesId);

    for (let i = 0; i < note.Operations.length; i++) {
      const operation = await Operations.findByPk(note.Operations[i].id);
      await operation.destroy();
    }

    if (note.type == 1) {
      company.balance = Number(company.balance) + Number(note.total);
    }

    if (note.type == 2) {
      company.balance = Number(company.balance) - Number(note.total);
    }

    await company.save();
  });

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
