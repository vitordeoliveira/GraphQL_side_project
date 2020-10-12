const { Products } = require("../../database/models");

module.exports = {
  getProduct: async (parent, args) => {
    try {
      const product = await Products.findAll();

      if (args.filterById) {
        const filterById = product.filter((users) => {
          return users.id == args.filterById;
        });
        return filterById;
      }
      return product;
    } catch (error) {}
  },

  getStockBalance: async (parent, args) => {
    try {
      const product = await Products.findAll();
      let value = 0;

      product.forEach((item) => {
        value = value + Number(item.balanceStock);
      });

      return value;
    } catch (error) {
      console.log(error);
    }
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

  updateProduct: async (_, { id, name, stock, balanceStock }, { user }) => {
    try {
      const [result] = await Products.update(
        { name, stock, balanceStock },
        {
          where: { id },
        }
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (_, { id }, { user }) => {
    try {
      if (user.role === "admin" || user.role === "dev") {
        const product = await Products.findByPk(id);
        product.destroy();
        return { success: true, error: null };
      }

      return { success: false, error: "User dont have necessary permissions" };
    } catch (error) {
      return Error`Server error`;
    }
  },
};
