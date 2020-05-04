module.exports = {
  types: `
    type Company {
    id: ID!
    Users: [User]
    name: String!
    createdAt: Date
    updatedAt: Date
  }
`,

  query: `
    getCompany(name: String): [Company]
`,

  mutation: `
  addCompany(name: String): Company
  deleteCompany(id: Int): String
  `,
};
