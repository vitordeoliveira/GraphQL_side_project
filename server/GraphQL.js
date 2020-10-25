const { ApolloServer } = require("apollo-server-express");

const jwt = require("jsonwebtoken");

const getUser = (token) => {
  try {
    if (token) {
      const { user } = jwt.verify(token, "process.env.SECRET");
      return user;
    }
    return null;
  } catch (err) {
    return null;
  }
};

module.exports = new ApolloServer({
  modules: [
    require("./Users"),
    require("./Operations"),
    require("./Auth"),
    require("./Products"),
    require("./Clients"),
    require("./Companies"),
    require("./Notes"),
    require("./Workers"),
    require("./Documents"),
  ],
  context: ({ req }) => {
    const token = req.headers["x-auth-acc"];
    const user = getUser(token);
    return { user };
  },
});
