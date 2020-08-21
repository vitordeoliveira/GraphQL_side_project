const {
  Operations,
  Products,
  Companies,
  Users,
  Clients,
} = require("../../database/models");

module.exports = {
  getOperation: async (parent, args, { user }) => {
    try {
      const operations = await Operations.findAll({
        include: [
          {
            model: Users,
            as: "Users",
            where: {
              CompaniesId: user.CompaniesId,
            },
          },
          {
            model: Products,
            as: "Products",
          },
          {
            model: Clients,
            as: "Clients",
          },
        ],
      });

      return operations;
    } catch (error) {
      console.log(error);
    }
  },

  addPurchase: async (_, { productId, clientId, value, amount }, { user }) => {
    try {
      if (user) {
        const { id, CompaniesId } = user;
        const purchase = await new Operations({
          type: 1,
          ProductsId: productId,
          ClientsId: clientId,
          UsersId: id,
          value,
          amount,
        });

        const product = await Products.findByPk(productId);
        const company = await Companies.findByPk(CompaniesId);

        product.stock = product.stock + amount;
        product.balanceStock =
          Number(product.balanceStock) + Number(amount) * Number(value);
        company.balance =
          Number(company.balance) - Number(amount) * Number(value);

        await purchase.save();
        await product.save();
        await company.save();

        return { operation: purchase, products: product, company };
      }
    } catch (error) {
      console.log(error);
    }
  },

  addSale: async (parent, { productId, clientId, value, amount }, { user }) => {
    try {
      if (user) {
        const { id, CompaniesId } = user;

        const sale = await new Operations({
          type: 2,
          ProductsId: productId,
          ClientsId: clientId,
          UsersId: id,
          value,
          amount,
        });

        const product = await Products.findByPk(productId);
        const company = await Companies.findByPk(CompaniesId);

        if (product.stock >= Number(amount)) {
          product.stock = product.stock - amount;
          product.balanceStock =
            Number(product.balanceStock) - Number(amount) * Number(value);
          company.balance =
            Number(company.balance) + Number(amount) * Number(value);

          if (product.balanceStock < 0) {
            product.balanceStock = 0;
          }
        } else {
          return null;
        }

        await sale.save();
        await product.save();
        await company.save();

        return { operation: sale, products: product, company };
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
