const { gql } = require("apollo-server-express");
const { addClient, getClients } = require("./resolvers");

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
      type: ID
      name: String
      email: String
      phone: String
      comments: String
    ): Client
  }
`;

const resolvers = {
  Query: {
    getClients,
  },
  Mutation: {
    addClient,
  },
};

module.exports = { typeDefs, resolvers };
