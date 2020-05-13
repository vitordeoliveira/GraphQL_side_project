const { gql } = require("apollo-server-express");
const { addProduct, getProduct, deleteProduct } = require("./resolvers");

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

  extend type Query {
    getProduct(id: ID, CompaniesId: ID, name: String): [Product]
  }

  extend type Mutation {
    addProduct(name: String!, stock: Int, balanceStock: Float): Product
    deleteProduct(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    getProduct,
  },

  Mutation: {
    addProduct,
    deleteProduct,
  },
};

module.exports = { typeDefs, resolvers };
