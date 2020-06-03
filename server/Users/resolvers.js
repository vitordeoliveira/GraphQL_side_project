const { Users, Operations } = require("../../database/models");

module.exports = {
  getUsers: async (root, args, context) => {
    try {
      const data = await Users.findAll({
        include: [
          {
            model: Operations,
            as: "Operations",
          },
        ],
      });

      if (args.filterById) {
        const filterById = data.filter((users) => {
          return users.id == args.filterById;
        });
        return filterById;
      }

      if (args.filterByName) {
        const filterByName = data.filter((users) => {
          return users.name.indexOf(args.filterByName) !== -1;
        });
        return filterByName;
      }

      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
