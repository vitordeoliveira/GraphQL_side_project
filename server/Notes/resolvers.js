const {
  Operations,
  Notes,
  Products,
  Companies,
  Users,
  Clients,
} = require("../../database/models");

module.exports = {
  getNotes: async (parent, args, { user }) => {
    try {
      if (!user) throw "Error";
      const notes = await Notes.findAll({
        include: [
          {
            model: Operations,
            as: "Operations",
            include: [
              {
                model: Products,
                as: "Products",
              },
            ],
          },
          {
            model: Clients,
            as: "Clients",
          },
          {
            model: Companies,
            as: "Companies",
          },
          {
            model: Users,
            as: "Users",
          },
        ],
      });

      return notes;
    } catch (error) {
      console.log(error);
    }
  },

  addPurchaseNote: async (parent, args, { user }) => {
    try {
      const { id, CompaniesId } = user;

      console.log(user);
      const additional = args.additional || 0;
      const discount = args.discount || 0;

      const note = await Notes.create({
        type: 1,
        UsersId: id,
        CompaniesId: CompaniesId,
        ClientsId: args.clientId,
        additional,
        discount,
        total: 0,
      });
      const company = await Companies.findByPk(CompaniesId);

      const operations = args.operation.map((item) =>
        JSON.parse(JSON.stringify(item))
      );

      let total = 0;

      for (let i = 0; i < operations.length; i++) {
        let item = operations[i];
        let product = await Products.findByPk(item.productId);

        product.stock = Number(product.stock) + Number(item.amount);
        product.balanceStock =
          Number(product.balanceStock) +
          Number(item.amount) * Number(item.value);

        total = total + item.value * item.amount;

        await product.save();
        await Operations.create({
          type: 1,
          NotesId: note.id,
          ProductsId: item.productId,
          ClientsId: args.clientId,
          UsersId: id,
          value: item.value,
          amount: item.amount,
        });
      }

      note.total = total + additional - discount;
      company.balance = company.balance - (total + additional - discount);

      await company.save();
      await note.save();
      return note;
    } catch (error) {
      console.log(error);
    }
  },

  addSaleNote: async (parent, args, { user }) => {
    try {
      const { id, CompaniesId } = user;
      const additional = args.additional || 0;
      const discount = args.discount || 0;

      const note = await Notes.create({
        type: 2,
        ClientsId: args.clientId,
        additional: additional || 0,
        discount: discount || 0,
        total: 0,
      });
      const company = await Companies.findByPk(CompaniesId);

      const operations = args.operation.map((item) =>
        JSON.parse(JSON.stringify(item))
      );

      let total = 0;

      for (let i = 0; i < operations.length; i++) {
        const item = operations[i];
        const product = await Products.findByPk(item.productId);

        if (product.stock < Number(item.amount)) continue;

        product.stock = Number(product.stock) - Number(item.amount);

        product.balanceStock =
          Number(product.balanceStock) -
          Number(item.amount) * Number(item.value);

        if (product.balanceStock < 0) product.balanceStock = 0;

        total = total + item.value * item.amount;

        await product.save();
        await Operations.create({
          type: 2,
          NotesId: note.id,
          ProductsId: item.productId,
          ClientsId: args.clientId,
          UsersId: id,
          value: item.value,
          amount: item.amount,
        });
      }

      note.total = total - additional + discount;
      company.balance =
        Number(company.balance) + (total - additional + discount);

      await company.save();
      await note.save();
      return note;
    } catch (error) {
      console.log(error);
    }
  },
};
