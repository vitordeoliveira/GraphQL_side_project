module.exports = {
  types: `
      type Purchase {
      id: ID!
      UsersId: ID!
      ProductsId: ID!
      value: Float!
      amount: Float!
      createdAt: Date
      updatedAt: Date
    }
  `,

  query: `
      getPurchase(id: ID, user: ID, product: ID): [Purchase]
  `,

  mutation: `
     addPurchase(productId:ID!, value:Float!, amount:Float!): Purchase
  `,
};
