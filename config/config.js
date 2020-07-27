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
    username: "macsucatas",
    password: "macsucatas1",
    database: "macsucatas",
    host: "mysql669.umbler.com",
    dialect: "mysql",
  },
};
