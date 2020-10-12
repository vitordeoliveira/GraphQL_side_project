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

  addPurchase: async (
    _,
    { productId, clientId, noteId, value, amount },
    { user }
  ) => {
    try {
      if (user) {
        const { id } = user;
        const purchase = await new Operations({
          type: 1,
          NotesId: noteId,
          ProductsId: productId,
          ClientsId: clientId,
          UsersId: id,
          value,
          amount,
        });

        await purchase.save();

        return purchase;
      }
    } catch (error) {
      console.log(error);
    }
  },

  addSale: async (parent, { productId, clientId, value, amount }, { user }) => {
    try {
      if (user) {
        const { id } = user;

        const sale = await new Operations({
          type: 2,
          ProductsId: productId,
          ClientsId: clientId,
          UsersId: id,
          value,
          amount,
        });

        const product = await Products.findByPk(productId);

        if (product.stock >= Number(amount)) {
          return null;
        }

        await sale.save();

        return { operation: sale };
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
