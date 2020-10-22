const { gql } = require("apollo-server-express");
const {
  addProduct,
  getProduct,
  getStockBalance,
  deleteProduct,
  updateProduct,
} = require("./resolvers");

const typeDefs = gql`
  type Product {
    id: ID!
    CompaniesId: ID!
    name: String!
    stock: Int
    balanceStock: Float
    last_purchase: Float
    createdAt: Date
    updatedAt: Date
  }

  type deleteProduct {
    success: Boolean!
    error: String
  }

  extend type Query {
    getProduct(filterById: ID): [Product]
    getStockBalance: Float
  }

  extend type Mutation {
    addProduct(name: String!, stock: Int, balanceStock: Float): Product
    deleteProduct(id: ID!): deleteProduct
    updateProduct(
      id: ID!
      name: String
      stock: Int
      balanceStock: Float
    ): Boolean
  }
`;

const resolvers = {
  Query: {
    getProduct,
    getStockBalance,
  },

  Mutation: {
    addProduct,
    updateProduct,
    deleteProduct,
  },
};

module.exports = { typeDefs, resolvers };
