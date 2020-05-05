const { gql } = require("apollo-server-express");
const { addProduct, getProduct } = require("./resolvers");

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
  }
`;

const resolvers = {
  Query: {
    getProduct,
    addProduct,
  },
};

module.exports = { typeDefs, resolvers };
