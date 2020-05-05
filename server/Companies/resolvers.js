const { Companies, Users } = require("../../database/models");

module.exports = {
  getCompany: async (parent, args, { user }) => {
    try {
      if (user) {
        const company = await Companies.findAll({
          include: [
            {
              model: Users,
              as: "Users",
            },
          ],
        });
        return company;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  addCompany: async (root, { name }, { user }) => {
    try {
      if (user.role === "admin" || user.role === "dev") {
        const company = await Companies.create({ name });
        return company;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  deleteCompany: async (root, { id }, { user }) => {
    try {
      const company = await Companies.findByPk(id);

      if (user.role === "admin" || user.role === "dev") {
        company.destroy();
        return `Company ${id} deleted`;
      }
      return `Company ${id} can not be deleted`;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
