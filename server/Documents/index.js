const { gql } = require("apollo-server-express");
const {
  uploads,
  singleUpload,
  retrieveFile,
  deleteFile,
} = require("./resolvers");

const typeDefs = gql`
  scalar Upload

  type Document {
    id: ID
    WorkersId: ID
    path: String
  }

  type Retrievedocument {
    base64: String
    path: String
  }

  extend type Query {
    uploads(workerId: ID): [Document]
  }

  extend type Mutation {
    singleUpload(file: Upload!, workerId: ID): Boolean
    retrieveFile(documentId: ID): Retrievedocument
    deleteFile(documentId: ID): Boolean
  }
`;

const resolvers = {
  Query: { uploads },
  Mutation: { singleUpload, retrieveFile, deleteFile },
};

module.exports = { typeDefs, resolvers };
