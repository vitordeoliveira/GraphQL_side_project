const { Workers, Documents, Companies } = require("../../database/models");
const fs = require("fs");

module.exports = {
  uploads: async (parent, args, { user }) => {
    try {
      const documents = await Documents.findAll();

      if (args.workerId) {
        return documents.filter((item) => item.WorkersId == args.workerId);
      }

      return documents;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  retrieveFile: async (parent, { documentId }, { user }) => {
    try {
      const document = await Documents.findByPk(documentId);
      const file = fs.readFileSync(`./${document.path}`);
      const base64 = await Buffer.from(file, "base64").toString("base64");

      console.log(document.path);
      return { base64: base64, path: document.path };
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  singleUpload: async (root, { file, workerId }, { user }) => {
    try {
      if (!file) return false;
      const { createReadStream, filename } = await file;

      const document = await Documents.create({
        path: `files/${filename}`,
        WorkersId: workerId,
      });

      const readstream = createReadStream();
      readstream.on("data", function (chunk) {
        fs.writeFileSync(document.path, chunk);
      });

      readstream.on("error", function () {
        return false;
      });

      return false;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  deleteFile: async (root, { documentId }, { user }) => {
    const document = await Documents.findByPk(documentId);
    await document.destroy();

    fs.unlinkSync(`./${document.path}`);

    return true;
  },
};
