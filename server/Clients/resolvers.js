const { Clients } = require("../../database/models");

module.exports = {
  getClients: async (parent, args) => {
    try {
    } catch (error) {}
  },

  addClient: async (
    parent,
    { type, name, email, phone, comments },
    { user }
  ) => {
    try {
      const data = Clients.create({
        type,
        name,
        email,
        phone,
        comments,
      });

      return data;
    } catch (error) {}
  },
};
