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

      const operations = args.operation.map((item) =>
        JSON.parse(JSON.stringify(item))
      );

      let total = 0;

      for (let i = 0; i < operations.length; i++) {
        let item = operations[i];
        total = total + item.value * item.amount;

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
        UsersId: id,
        CompaniesId: CompaniesId,
        ClientsId: args.clientId,
        additional,
        discount,
        total: 0,
      });

      const operations = args.operation.map((item) =>
        JSON.parse(JSON.stringify(item))
      );

      let total = 0;

      for (let i = 0; i < operations.length; i++) {
        const item = operations[i];

        total = total + item.value * item.amount;

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
      await note.save();
      return note;
    } catch (error) {
      console.log(error);
    }
  },

  updateNote: async (parent, args, { user }) => {
    if (!(user.role === "admin" || user.role === "dev")) throw "Error";

    const note = await Notes.findByPk(args.noteId);
    await note.destroy();

    const { id, CompaniesId } = user;

    const additional = args.additional || 0;
    const discount = args.discount || 0;

    const note = await Notes.create({
      type: args.type,
      UsersId: id,
      CompaniesId: CompaniesId,
      ClientsId: args.clientId,
      additional,
      discount,
      total: 0,
    });

    const operations = args.operation.map((item) =>
      JSON.parse(JSON.stringify(item))
    );

    let total = 0;

    for (let i = 0; i < operations.length; i++) {
      let item = operations[i];
      total = total + item.value * item.amount;

      await Operations.create({
        type: args.type,
        NotesId: note.id,
        ProductsId: item.productId,
        ClientsId: args.clientId,
        UsersId: id,
        value: item.value,
        amount: item.amount,
      });
    }

    if (args.type == 1) note.total = total + additional - discount;
    if (args.type == 2) note.total = total - additional + discount;

    await note.save();
    return note;
  },
};
