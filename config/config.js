module.exports = {
  dev: {
    username: process.env.ROOT_USER,
    password: process.env.ROOT_PASSWORD,
    database: process.env.ROOT_DATABASE,
    host: process.env.ROOT_HOST,
    dialect: "mysql",
  },

  production: {
    port: process.env.MAC_PORT,
    username: process.env.MAC_USER,
    password: process.env.MAC_PASSWORD,
    database: process.env.MAC_DATABASE,
    host: process.env.MAC_HOST,
    dialect: "mysql",
  },
};
