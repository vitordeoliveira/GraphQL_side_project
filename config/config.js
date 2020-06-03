module.exports = {
  dev: {
    username: "root",
    password: null,
    database: "database_development_mac",
    host: "127.0.0.1",
    dialect: "mysql",
  },

  test: {
    username: "root",
    password: null,
    database: "database_test_mac",
    host: "127.0.0.1",
    dialect: "mysql",
  },

  production: {
    port: "3306",
    username: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: "macsucatas",
    host: process.env.HOST,
    dialect: "mysql",
  },
};
