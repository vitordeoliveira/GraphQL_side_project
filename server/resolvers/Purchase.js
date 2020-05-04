const { Purchase, Products } = require("../../database/models");

module.exports = {
  getProduct: async (parent, args) => {
    try {
    } catch (error) {}
  },

  addPurchase: async (parent, { productId, value, amount }, { user }) => {
    let purchaseId = null;
    try {
      if (user) {
        const { id } = user;
        const purchase = await new Purchase({
          ProductsId: productId,
          UsersId: id,
          value,
          amount,
        });
        purchaseId = purchase.id;

        const product = await Products.findByPk(productId);
        product.stock = product.stock + amount;
        product.balanceStock =
          Number(product.balanceStock) + Number(amount) * Number(value);

        const data = purchase.save();
        product.save();

        return data;
      }
    } catch (error) {
      console.log(error);
      const data = await Purchase.findByPk(purchaseId);
      data.destroy();
    }
  },
};
