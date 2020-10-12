const { gql } = require("apollo-server-express");
const { addPurchase, getOperation, addSale } = require("./resolvers");

const typeDefs = gql`
  type Operation {
    id: ID!
    type: ID!
    UsersId: ID!
    ClientsId: ID!
    ProductsId: ID!
    Users: User
    Products: Product
    Clients: Client
    value: Float!
    amount: Float!
    createdAt: Date
    updatedAt: Date
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
      noteId: ID!
      value: Float!
      amount: Float!
    ): Operation

    addSale(
      productId: ID!
      clientId: ID
      noteId: ID!
      value: Float!
      amount: Float!
    ): Operation
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
