const { Products } = require("../../database/models");

module.exports = {
  getProduct: async (parent, args) => {
    try {
      const product = await Products.findAll();
      return product;
    } catch (error) {}
  },

  addProduct: async (parent, { name, stock, balanceStock }, { user }) => {
    try {
      const { CompaniesId } = user;

      const product = await Products.create({
        CompaniesId,
        name,
        stock,
        balanceStock,
      });
      return product;
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (_, { id }, { user }) => {
    try {
      const product = await Products.findByPk(id);
      product.destroy();
      return `Product ${id} deleted`;
    } catch (error) {
      console.log(error);
    }
  },
};
