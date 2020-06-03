const { gql } = require("apollo-server-express");
const {
  addClient,
  getClients,
  deleteClient,
  updateClient,
} = require("./resolvers");

const typeDefs = gql`
  type Client {
    id: ID!
    type: ID
    name: String
    email: String
    phone: String
    comments: String
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    getClients(filterByType: ID): [Client]
  }

  extend type Mutation {
    addClient(
      type: ID!
      name: String!
      email: String
      phone: String
      comments: String
    ): Client

    deleteClient(id: ID!): Boolean

    updateClient(
      id: ID!
      name: String
      email: String
      phone: String
      comments: String
    ): Boolean
  }
`;

const resolvers = {
  Query: {
    getClients,
  },
  Mutation: {
    addClient,
    updateClient,
    deleteClient,
  },
};

module.exports = { typeDefs, resolvers };
