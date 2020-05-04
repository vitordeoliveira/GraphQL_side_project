module.exports = {
  types: `
    type LoginResponse {
        token: String
        user: User
      }
    `,

  query: ``,

  mutation: `
    login(username: String!, password: String!): LoginResponse
    register(
        CompaniesId: ID
        role: String
        name: String
        username: String
        password: String
      ): User`,
};
