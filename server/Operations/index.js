const { gql } = require("apollo-server-express");
const { addPurchase, getOperation } = require("./resolvers");

const typeDefs = gql`
  type Operation {
    id: ID!
    type: ID!
    UsersId: ID!
    ClientsId: ID!
    ProductsId: ID!
    value: Float!
    amount: Float!
    createdAt: Date
    updatedAt: Date
  }

  type OperationResponse {
    operation: Operation
    products: Product
  }

  extend type Query {
    getOperation(
      filterById: ID
      filterByUser: ID
      filterByProduct: ID
    ): [Operation]
  }

  extend type Mutation {
    addPurchase(
      productId: ID!
      clientId: ID
      value: Float!
      amount: Float!
    ): OperationResponse
    addSale(productId: ID!, value: Float!, amount: Float!): Operation
  }
`;

const resolvers = {
  Query: {
    getOperation,
  },
  Mutation: {
    addPurchase,
  },
};

module.exports = { typeDefs, resolvers };
