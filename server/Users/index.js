const { gql } = require("apollo-server-express");
const { getUsers } = require("./resolvers");

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    CompaniesId: ID!
    role: String!
    name: String!
    username: String!
    password: String!
    Operations: [Operation]
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    getUsers(filterById: ID, filterByName: String): [User]
  }
`;

const resolvers = {
  Query: {
    getUsers,
  },
};

module.exports = { typeDefs, resolvers };
