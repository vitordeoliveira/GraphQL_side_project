const express = require("express");
const app = express();

const Apollo = require("./server/GraphQL");

require("./database/models");

Apollo.applyMiddleware({ app });

// DEPLOY
// const baseDir = `${__dirname}/web/build`;
// app.use(express.static(`${baseDir}`));
// app.get("*", (_, res) => res.sendFile("index.html", { root: baseDir }));

var port = process.env.PORT || 5000;

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port + Apollo.graphqlPath}`)
);
