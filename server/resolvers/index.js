const { getCompany, addCompany, deleteCompany } = require("./Company");
const { getUsers } = require("./User");
const { login, register, middleware } = require("./Auth");
const { getProduct, addProduct } = require("./Product");
const { addPurchase } = require("./Operation");
const { addClient } = require("./Client");

const resolvers = {
  Query: {
    getCompany,
    getUsers,
    getProduct,
  },
  Mutation: {
    login,
    register,
    addCompany,
    deleteCompany,
    addProduct,
    addPurchase,
    addClient,
  },
};

module.exports = resolvers;
