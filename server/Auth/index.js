const { gql } = require("apollo-server-express");
const { login, register } = require("./resolvers");

const typeDefs = gql`
  type LoginResponse {
    token: String
    user: User
  }

  extend type Mutation {
    login(username: String!, password: String!): LoginResponse
    register(
      CompaniesId: ID
      role: String
      name: String
      username: String
      password: String
    ): User
  }
`;

const resolvers = {
  Query: {},
  Mutation: {
    login,
    register,
  },
};

module.exports = { typeDefs, resolvers };
