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
    port: "41890",
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: "macsucatas",
    host: "mysql669.umbler.com",
    dialect: "mysql",
  },
};
