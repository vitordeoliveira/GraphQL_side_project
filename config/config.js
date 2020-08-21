module.exports = {
  dev: {
    username: "vitor",
    password: "mac254638",
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
    username: "macsucatas",
    password: "macsucatas1",
    database: "macsucatas",
    host: "mysql669.umbler.com",
    dialect: "mysql",
  },
};
