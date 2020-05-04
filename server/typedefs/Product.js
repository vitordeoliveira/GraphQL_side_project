module.exports = {
  types: `
        type Product {
        id: ID!
        CompaniesId: ID!
        name: String!
        stock: Int
        balanceStock: Float
        createdAt: Date
        updatedAt: Date
      }
    `,

  query: `
        getProduct(id: ID, CompaniesId: ID, name: String): [Product]
    `,

  mutation: `
       addProduct(name:String!, stock: Int, balanceStock:Float): Product
    `,
};
