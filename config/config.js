module.exports = {
  development: {
    username: "root",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
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
