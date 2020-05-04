module.exports = {
  types: `
    type User {
    id: ID!
    CompaniesId: ID!
    role: String!
    name: String!
    username: String!
    password: String!
    Purchases: [Purchase]
    createdAt: Date
    updatedAt: Date
  }
`,

  query: `
    getUsers(filterById:ID, filterByName:String): [User]
`,

  mutation: `login(username: String!, password: String!): LoginResponse`,
};
