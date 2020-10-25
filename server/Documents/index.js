const { gql } = require("apollo-server-express");
const { uploads, singleUpload } = require("./resolvers");

const typeDefs = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  extend type Query {
    uploads: [File]
  }

  extend type Mutation {
    singleUpload(file: Upload!): Boolean
  }
`;

const resolvers = {
  Query: { uploads },
  Mutation: { singleUpload },
};

module.exports = { typeDefs, resolvers };
