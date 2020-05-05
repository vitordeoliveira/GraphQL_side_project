const { Products } = require("../../database/models");

module.exports = {
  getProduct: async (parent, args) => {
    try {
    } catch (error) {}
  },

  addProduct: async (parent, { name }, { user }) => {
    try {
      const { CompaniesId } = user;
      const product = await Products.create({ CompaniesId, name });
      return product;
    } catch (error) {}
  },
};
