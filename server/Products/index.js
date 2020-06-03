const { gql } = require("apollo-server-express");
const {
  addProduct,
  getProduct,
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
    createdAt: Date
    updatedAt: Date
  }

  type deleteProduct {
    success: Boolean!
    error: String
  }

  extend type Query {
    getProduct(filterById: ID): [Product]
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
  },

  Mutation: {
    addProduct,
    updateProduct,
    deleteProduct,
  },
};

module.exports = { typeDefs, resolvers };
