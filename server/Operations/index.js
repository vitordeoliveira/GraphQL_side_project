const { gql } = require("apollo-server-express");
const { addPurchase, getOperation, addSale } = require("./resolvers");

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
    company: Company
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

    addSale(
      productId: ID!
      clientId: ID
      value: Float!
      amount: Float!
    ): OperationResponse
  }
`;

const resolvers = {
  Query: {
    getOperation,
  },
  Mutation: {
    addPurchase,
    addSale,
  },
};

module.exports = { typeDefs, resolvers };
