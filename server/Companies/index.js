const { gql } = require("apollo-server-express");
const { addCompany, deleteCompany, getCompany } = require("./resolvers");

const typeDefs = gql`
  type Company {
    id: ID!
    Users: [User]
    name: String!
    balance: Float
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    getCompany(name: String): [Company]
  }

  extend type Mutation {
    addCompany(name: String): Boolean
    deleteCompany(id: Int): String
  }
`;

const resolvers = {
  Query: {
    getCompany,
  },
  Mutation: {
    addCompany,
    deleteCompany,
  },
};

module.exports = { typeDefs, resolvers };
