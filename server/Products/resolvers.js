const { Products } = require("../../database/models");

module.exports = {
  getProduct: async (parent, args, { user }) => {
    try {
      if (user.role === "admin" || user.role === "dev") {
        return await Products.findAll();
      }

      if (user.role === "subadmin") {
        return await Products.findAll({
          where: { CompaniesId: user.CompaniesId },
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  getStockBalance: async (parent, args, { user }) => {
    try {
      let value = 0;

      if (user.role === "admin" || user.role === "dev") {
        const product = await Products.findAll();

        product.forEach((item) => {
          value = value + Number(item.balanceStock);
        });
      }

      if (user.role === "subadmin") {
        const product = await Products.findAll({
          where: { CompaniesId: user.CompaniesId },
        });

        product.forEach((item) => {
          value = value + Number(item.balanceStock);
        });
      }

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
