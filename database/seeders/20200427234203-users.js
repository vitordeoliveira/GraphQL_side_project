const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          role: "dev",
          name: "Vitor de Oliveira",
          username: "vitordeoliveira",
          password: bcrypt.hashSync("gexus.com.br", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          CompaniesId: 1,
          role: "sub",
          name: "Mariana Dobrovolski",
          username: "marianadobro",
          password: bcrypt.hashSync("123321", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
