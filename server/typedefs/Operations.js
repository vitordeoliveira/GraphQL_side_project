const { gql } = require("apollo-server-express");
const { getUsers } = require("../resolvers/User");

const typeDefs = gql`
  type Operation {
    id: ID!
    type: ID!
    UsersId: ID!
    ClientsId: ID!
    value: Float!
    amount: Float!
    createdAt: Date
    updatedAt: Date
  }

  type OperationResponse {
    operation: Operation
  }

  extend type Query {
    getOperation(
      filterById: ID
      filterByUser: ID
      filterByProduct: ID
    ): [Operation]
  }

  type Mutation {
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
    getUsers,
  },
};

module.exports = { typeDefs, resolvers };
