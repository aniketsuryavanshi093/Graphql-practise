const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const { graphqlschema } = require("./graphql/qraphqlschema");
const { graphqlroots } = require("./graphql/graphqlroot");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlschema,
    rootValue: graphqlroots,
    graphiql: true,
  })
);
mongoose
  .connect(process.env.MONGODB_SRV)
  .then(() => {
    console.log("server started at post 3000");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
