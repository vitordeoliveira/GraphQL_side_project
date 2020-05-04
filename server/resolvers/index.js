const { getCompany, addCompany, deleteCompany } = require("./Company");
const { getUsers } = require("./User");
const { login, register, middleware } = require("./Auth");
const { getProduct, addProduct } = require("./Product");
const { addPurchase } = require("./Purchase");

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
  },
};

module.exports = resolvers;
