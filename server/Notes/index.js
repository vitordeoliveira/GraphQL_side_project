const { gql } = require("apollo-server-express");
const { getNotes, addPurchaseNote, addSaleNote } = require("./resolvers");

const typeDefs = gql`
  type Notes {
    id: ID
    Clients: Client
    Companies: Company
    Users: User
    type: String
    ClientsId: ID
    additional: Float
    discount: Float
    Operations: [Operation]
    total: Float
  }

  input OperationsInput {
    productId: ID!
    value: Float!
    amount: Float!
  }

  extend type Query {
    getNotes: [Notes]
  }

  extend type Mutation {
    addPurchaseNote(
      type: ID
      clientId: ID
      additional: Float
      discount: Float
      total: Float
      operation: [OperationsInput]
    ): Notes

    addSaleNote(
      type: ID
      clientId: ID
      additional: Float
      discount: Float
      total: Float
      operation: [OperationsInput]
    ): Notes
  }
`;

const resolvers = {
  Query: {
    getNotes,
  },
  Mutation: {
    addPurchaseNote,
    addSaleNote,
  },
};

module.exports = { typeDefs, resolvers };
