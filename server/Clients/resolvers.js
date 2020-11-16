const { Clients } = require("../../database/models");

module.exports = {
  getClients: async (parent, args, { user }) => {
    try {
      if (user.role === "admin" || user.role === "dev") {
        return await Clients.findAll();
      }

      if (user.role === "subadmin") {
        return await Clients.findAll({
          where: { id: user.CompaniesId },
        });
      }
    } catch (error) {
      console.log(error);
      return "Error 500";
    }
  },

  addClient: async (
    parent,
    { type, name, email, phone, comments },
    { user }
  ) => {
    try {
      const data = await Clients.create({
        type,
        name,
        email,
        phone,
        comments,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  updateClient: async (parent, { id, name, email, phone }, { user }) => {
    try {
      if (!user) {
        return false;
      }
      const [result] = await Clients.update(
        { name, email, phone },
        {
          where: { id },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      return "error 500";
    }
  },

  deleteClient: async (parent, { id }, { user }) => {
    try {
      const client = await Clients.findByPk(id);

      if (!client || !(user.role === "dev" || user.role === "admin")) {
        return false;
      }

      await client.destroy();
      return true;
    } catch (error) {
      console.log(error);
      return "error 500";
    }
  },
};
