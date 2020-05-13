const express = require("express");
const app = express();

require("dotenv").config({ path: "./config/.env" });
require("./database/models");

const Apollo = require("./server/GraphQL");
Apollo.applyMiddleware({ app });

app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] == "http")
    res.redirect(`https://${req.hostname}${req.url}`);
  else next();
});

// DEPLOY
const baseDir = `${__dirname}/build`;
app.use(express.static(`${baseDir}`));
app.get("*", (_, res) => res.sendFile("index.html", { root: baseDir }));

var port = process.env.PORT || 5000;

app.listen({ port }, () =>
  console.log(`Server ready at https://localhost:${port + Apollo.graphqlPath}`)
);
