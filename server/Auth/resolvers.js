const { Users } = require("../../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  auth: async (_, __, { user }) => {
    return user;
  },
  login: async (_, { username, password }) => {
    const user = await Users.findOne({
      where: { username },
      attributes: ["id", "role", "name", "username", "CompaniesId", "password"],
    });

    if (!user) {
      return { token: null };
    }

    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) {
      return { token: null };
    }

    user.password = undefined;

    const token = jwt.sign({ user }, "process.env.SECRET");

    return { token, user, error: null };
  },

  register: async (
    parent,
    { CompaniesId, role, name, username, password },
    { user }
  ) => {
    try {
      if (!(user.role === "dev" || user.role === "admin")) throw "Error";

      const hash = bcrypt.hashSync(password, 10);

      const newuser = await Users.create({
        CompaniesId,
        role,
        name,
        username,
        password: hash,
      });

      return newuser;
    } catch (error) {
      return error;
    }
  },

  middleware: (parent, args, { payload }) => {
    return payload;
  },
};
