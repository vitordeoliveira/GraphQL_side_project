const { gql } = require("apollo-server-express");

const Auth = require("./Auth");
const User = require("./User");
const Company = require("./Company");
const Product = require("./Product");
const Purchase = require("./Purchase");

const typeDefs = gql`
  scalar Date

  ${Auth.types}
  ${User.types}
  ${Company.types}
  ${Product.types}
  ${Purchase.types}

  type Query {
    ${Company.query}
    ${User.query}
    ${Product.query}
    ${Purchase.query}
  }

  type Mutation {
    ${Auth.mutation}
    ${Company.mutation}
    ${Product.mutation}
    ${Purchase.mutation}
  }
`;

module.exports = typeDefs;
