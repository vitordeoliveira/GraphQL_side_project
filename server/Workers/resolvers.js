const { Workers, Documents, Companies } = require("../../database/models");

module.exports = {
  getWorkers: async (parent, args, { user }) => {
    try {
      if (user) {
        const workers = await Workers.findAll({
          include: [
            {
              model: Companies,
            },
          ],
        });

        return workers;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  addWorker: async (root, { name, phone }, { user }) => {
    try {
      if (user.role === "admin" || user.role === "dev") {
        const workers = await Workers.create({
          CompaniesId: user.CompaniesId,
          name,
          phone,
        });
        return workers;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  updateWorker: async (root, { id, name, phone }, { user }) => {
    try {
      if (user.role === "admin" || user.role === "dev") {
        const [result] = await Workers.update(
          { name, phone },
          {
            where: { id },
          }
        );
        return result;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  deleteWorker: async (root, { id }, { user }) => {
    try {
      if (user.role === "admin" || user.role === "dev") {
        const worker = await Workers.findByPk(id);
        worker.destroy();
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
