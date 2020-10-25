const { Workers, Documents, Companies } = require("../../database/models");
const fs = require("fs");

module.exports = {
  uploads: async (parent, args, { user }) => {
    try {
      console.log("Hum");
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  singleUpload: async (root, { file }, { user }) => {
    try {
      const { createReadStream, filename, mimetype, encoding } = await file;

      const readstream = createReadStream();
      readstream.on("data", function (chunk) {
        fs.writeFileSync(`${filename}`, chunk);
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
};
