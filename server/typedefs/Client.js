module.exports = {
  types: `
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
    `,

  query: `
        getClients(filterByType:ID): [Client]
    `,

  mutation: `
       addClient(type: ID, name:String, email:String, phone:String, comments:String): Client
    `,
};
