const { gql } = require("apollo-server-express");

const Auth = require("./Auth");
const User = require("./User");
const Company = require("./Company");
const Product = require("./Product");
const Operations = require("./Operations");
const Client = require("./Client");

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

  type LoginResponse {
    token: String
    user: User
  }

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

  type Company {
    id: ID!
    Users: [User]
    name: String!
    createdAt: Date
    updatedAt: Date
  }
  type Product {
    id: ID!
    CompaniesId: ID!
    name: String!
    stock: Int
    balanceStock: Float
    createdAt: Date
    updatedAt: Date
  }
  type Operation {
    id: ID!
    type: ID!
    UsersId: ID!
    ClientsId: ID!
    Products: Product
    value: Float!
    amount: Float!
    createdAt: Date
    updatedAt: Date
  }

  type OperationResponse {
    operation: Operation
    products: Product
  }

  type Query {
    getCompany(name: String): [Company]
    getUsers(filterById: ID, filterByName: String): [User]
    getProduct(id: ID, CompaniesId: ID, name: String): [Product]
    getOperation(
      filterById: ID
      filterByUser: ID
      filterByProduct: ID
    ): [Operation]
    getClients(filterByType: ID): [Client]
  }

  type Mutation {
    # Auth
    login(username: String!, password: String!): LoginResponse
    register(
      CompaniesId: ID
      role: String
      name: String
      username: String
      password: String
    ): User

    # Company
    addCompany(name: String): Company
    deleteCompany(id: Int): String

    # Product
    addProduct(name: String!, stock: Int, balanceStock: Float): Product

    # Operation
    addPurchase(
      productId: ID!
      clientId: ID
      value: Float!
      amount: Float!
    ): OperationResponse
    addSale(productId: ID!, value: Float!, amount: Float!): Operation

    # Client
    addClient(
      type: ID
      name: String
      email: String
      phone: String
      comments: String
    ): Client
  }
`;

module.exports = typeDefs;
