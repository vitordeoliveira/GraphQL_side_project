const { gql } = require("apollo-server-express");
const {
  getWorkers,
  addWorker,
  updateWorker,
  deleteWorker,
} = require("./resolvers");

const typeDefs = gql`
  type Worker {
    id: ID!
    Company: Company
    name: String!
    phone: String
    documents: [String]
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    getWorkers(
      id: ID
      CompaniesId: ID
      name: String
      phone: String
      documents: [String]
    ): [Worker]
  }

  extend type Mutation {
    addWorker(
      CompanyId: ID
      name: String
      phone: String
      documents: [String]
    ): Worker

    updateWorker(
      id: ID
      name: String
      phone: String
      documents: [String]
    ): Boolean

    deleteWorker(id: ID): Boolean
  }
`;

const resolvers = {
  Query: { getWorkers },
  Mutation: { addWorker, updateWorker, deleteWorker },
};

module.exports = { typeDefs, resolvers };
