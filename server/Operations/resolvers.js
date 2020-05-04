const { Operations, Products } = require("../../database/models");

module.exports = {
  getOperation: async (parent, args) => {
    try {
    } catch (error) {}
  },

  addPurchase: async (
    parent,
    { productId, clientId, value, amount },
    { user }
  ) => {
    try {
      if (user) {
        const { id } = user;
        const purchase = await new Operations({
          type: 1,
          ProductsId: productId,
          ClientsId: clientId,
          UsersId: id,
          value,
          amount,
        });

        const product = await Products.findByPk(productId);
        product.stock = product.stock + amount;
        product.balanceStock =
          Number(product.balanceStock) + Number(amount) * Number(value);

        await purchase.save();
        await product.save();

        return { operation: purchase, products: product };
      }
    } catch (error) {
      console.log(error);
    }
  },
};
